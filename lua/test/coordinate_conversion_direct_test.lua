-- CoordinateConversion direct test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("bng2latlong-converter_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

describe("CoordinateConversionDirect", function()
  it("should direct-load-coordinate_conversion", function()
    local setup = coordinate_conversion_direct_setup({ id = "direct01" })
    local _should_skip, _reason = runner.is_control_skipped("direct", "direct-load-coordinate_conversion", setup.live and "live" or "unit")
    if _should_skip then
      pending(_reason or "skipped via sdk-test-control.json")
      return
    end
    local client = setup.client

    local params = {}
    local query = {}
    if setup.live then
      params["easting"] = 529090
      params["northing"] = 179645
    else
      params["easting"] = "direct01"
      params["northing"] = "direct02"
    end

    local result, err = client:direct({
      path = "bng2latlong/{easting}/{northing}",
      method = "GET",
      params = params,
      query = query,
    })
    if setup.live then
      -- Live mode is lenient: synthetic IDs frequently 4xx. Skip rather
      -- than fail when the load endpoint isn't reachable with the IDs we
      -- can construct from setup.idmap.
      if err ~= nil then
        pending("load call failed (likely synthetic IDs against live API): " .. tostring(err))
        return
      end
      if not result["ok"] then
        pending("load call not ok (likely synthetic IDs against live API)")
        return
      end
      local status = helpers.to_int(result["status"])
      if status < 200 or status >= 300 then
        pending("expected 2xx status, got " .. tostring(status))
        return
      end
    else
      assert.is_nil(err)
      assert.is_true(result["ok"])
      assert.are.equal(200, helpers.to_int(result["status"]))
      assert.is_not_nil(result["data"])
      if type(result["data"]) == "table" then
        assert.are.equal("direct01", result["data"]["id"])
      end
      assert.are.equal(1, #setup.calls)
    end
  end)

end)


function coordinate_conversion_direct_setup(mockres)
  runner.load_env_local()

  local calls = {}

  local env = runner.env_override({
    ["BNG_LATLONGCONVERTER_TEST_COORDINATE_CONVERSION_ENTID"] = {},
    ["BNG_LATLONGCONVERTER_TEST_LIVE"] = "FALSE",
  })

  local live = env["BNG_LATLONGCONVERTER_TEST_LIVE"] == "TRUE"

  if live then
    local merged_opts = {
    }
    local client = sdk.new(merged_opts)
    return {
      client = client,
      calls = calls,
      live = true,
      idmap = {},
    }
  end

  local function mock_fetch(url, init)
    table.insert(calls, { url = url, init = init })
    return {
      status = 200,
      statusText = "OK",
      headers = {},
      json = function()
        if mockres ~= nil then
          return mockres
        end
        return { id = "direct01" }
      end,
      body = "mock",
    }, nil
  end

  local client = sdk.new({
    base = "http://localhost:8080",
    system = {
      fetch = mock_fetch,
    },
  })

  return {
    client = client,
    calls = calls,
    live = false,
    idmap = {},
  }
end
