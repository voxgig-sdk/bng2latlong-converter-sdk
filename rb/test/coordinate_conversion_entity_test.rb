# CoordinateConversion entity test

require "minitest/autorun"
require "json"
require_relative "../Bng2latlongConverter_sdk"
require_relative "runner"

class CoordinateConversionEntityTest < Minitest::Test
  def test_create_instance
    testsdk = Bng2latlongConverterSDK.test(nil, nil)
    ent = testsdk.CoordinateConversion(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = coordinate_conversion_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "coordinate_conversion." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set BNG_LATLONGCONVERTER_TEST_COORDINATE_CONVERSION_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    coordinate_conversion_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.coordinate_conversion")))
    coordinate_conversion_ref01_data = nil
    if coordinate_conversion_ref01_data_raw.length > 0
      coordinate_conversion_ref01_data = Helpers.to_map(coordinate_conversion_ref01_data_raw[0][1])
    end

    # LOAD
    coordinate_conversion_ref01_ent = client.CoordinateConversion(nil)
    coordinate_conversion_ref01_match_dt0 = {}
    coordinate_conversion_ref01_data_dt0_loaded = coordinate_conversion_ref01_ent.load(coordinate_conversion_ref01_match_dt0, nil)
    assert !coordinate_conversion_ref01_data_dt0_loaded.nil?

  end
end

def coordinate_conversion_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "coordinate_conversion", "CoordinateConversionTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = Bng2latlongConverterSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["coordinate_conversion01", "coordinate_conversion02", "coordinate_conversion03", "bng2latlong01", "bng2latlong02", "bng2latlong03", "easting01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["BNG_LATLONGCONVERTER_TEST_COORDINATE_CONVERSION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "BNG_LATLONGCONVERTER_TEST_COORDINATE_CONVERSION_ENTID" => idmap,
    "BNG_LATLONGCONVERTER_TEST_LIVE" => "FALSE",
    "BNG_LATLONGCONVERTER_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["BNG_LATLONGCONVERTER_TEST_COORDINATE_CONVERSION_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["BNG_LATLONGCONVERTER_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = Bng2latlongConverterSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["BNG_LATLONGCONVERTER_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["BNG_LATLONGCONVERTER_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
