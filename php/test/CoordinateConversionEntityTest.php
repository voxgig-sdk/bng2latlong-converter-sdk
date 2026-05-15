<?php
declare(strict_types=1);

// CoordinateConversion entity test

require_once __DIR__ . '/../bng2latlongconverter_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class CoordinateConversionEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = Bng2latlongConverterSDK::test(null, null);
        $ent = $testsdk->CoordinateConversion(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = coordinate_conversion_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "coordinate_conversion." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set BNG_LATLONGCONVERTER_TEST_COORDINATE_CONVERSION_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $coordinate_conversion_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.coordinate_conversion")));
        $coordinate_conversion_ref01_data = null;
        if (count($coordinate_conversion_ref01_data_raw) > 0) {
            $coordinate_conversion_ref01_data = Helpers::to_map($coordinate_conversion_ref01_data_raw[0][1]);
        }

        // LOAD
        $coordinate_conversion_ref01_ent = $client->CoordinateConversion(null);
        $coordinate_conversion_ref01_match_dt0 = [];
        [$coordinate_conversion_ref01_data_dt0_loaded, $err] = $coordinate_conversion_ref01_ent->load($coordinate_conversion_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($coordinate_conversion_ref01_data_dt0_loaded);

    }
}

function coordinate_conversion_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/coordinate_conversion/CoordinateConversionTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = Bng2latlongConverterSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["coordinate_conversion01", "coordinate_conversion02", "coordinate_conversion03", "bng2latlong01", "bng2latlong02", "bng2latlong03", "easting01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("BNG_LATLONGCONVERTER_TEST_COORDINATE_CONVERSION_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "BNG_LATLONGCONVERTER_TEST_COORDINATE_CONVERSION_ENTID" => $idmap,
        "BNG_LATLONGCONVERTER_TEST_LIVE" => "FALSE",
        "BNG_LATLONGCONVERTER_TEST_EXPLAIN" => "FALSE",
        "BNG_LATLONGCONVERTER_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["BNG_LATLONGCONVERTER_TEST_COORDINATE_CONVERSION_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["BNG_LATLONGCONVERTER_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["BNG_LATLONGCONVERTER_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new Bng2latlongConverterSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["BNG_LATLONGCONVERTER_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["BNG_LATLONGCONVERTER_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
