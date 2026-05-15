package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/bng2latlong-converter-sdk"
	"github.com/voxgig-sdk/bng2latlong-converter-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestCoordinateConversionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CoordinateConversion(nil)
		if ent == nil {
			t.Fatal("expected non-nil CoordinateConversionEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := coordinate_conversionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "coordinate_conversion." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set BNG_LATLONGCONVERTER_TEST_COORDINATE_CONVERSION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		coordinateConversionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.coordinate_conversion", setup.data)))
		var coordinateConversionRef01Data map[string]any
		if len(coordinateConversionRef01DataRaw) > 0 {
			coordinateConversionRef01Data = core.ToMapAny(coordinateConversionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = coordinateConversionRef01Data

		// LOAD
		coordinateConversionRef01Ent := client.CoordinateConversion(nil)
		coordinateConversionRef01MatchDt0 := map[string]any{}
		coordinateConversionRef01DataDt0Loaded, err := coordinateConversionRef01Ent.Load(coordinateConversionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if coordinateConversionRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func coordinate_conversionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "coordinate_conversion", "CoordinateConversionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read coordinate_conversion test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse coordinate_conversion test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"coordinate_conversion01", "coordinate_conversion02", "coordinate_conversion03", "bng2latlong01", "bng2latlong02", "bng2latlong03", "easting01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("BNG_LATLONGCONVERTER_TEST_COORDINATE_CONVERSION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"BNG_LATLONGCONVERTER_TEST_COORDINATE_CONVERSION_ENTID": idmap,
		"BNG_LATLONGCONVERTER_TEST_LIVE":      "FALSE",
		"BNG_LATLONGCONVERTER_TEST_EXPLAIN":   "FALSE",
		"BNG_LATLONGCONVERTER_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["BNG_LATLONGCONVERTER_TEST_COORDINATE_CONVERSION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["BNG_LATLONGCONVERTER_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["BNG_LATLONGCONVERTER_APIKEY"],
			},
			extra,
		})
		client = sdk.NewBng2latlongConverterSDK(core.ToMapAny(mergedOpts))
	}

	live := env["BNG_LATLONGCONVERTER_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["BNG_LATLONGCONVERTER_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
