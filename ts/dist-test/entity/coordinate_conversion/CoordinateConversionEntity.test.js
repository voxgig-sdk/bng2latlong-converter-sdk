"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CoordinateConversionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when BNG2LATLONG_CONVERTER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('BNG2LATLONG_CONVERTER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.Bng2latlongConverterSDK.test();
        const ent = testsdk.CoordinateConversion();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.BNG2LATLONG_CONVERTER_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'coordinate_conversion.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "easting", "req": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "latitude", "req": false, "type": "`$NUMBER`", "index$": 2 }, { "active": true, "name": "longitude", "req": false, "type": "`$NUMBER`", "index$": 3 }, { "active": true, "name": "northing", "req": false, "type": "`$INTEGER`", "index$": 4 }, { "active": true, "name": "status", "req": false, "type": "`$STRING`", "index$": 5 }], "id": { "field": "id", "name": "id", "parts": ["easting", "northing"], "sep": "/" }, "name": "coordinate_conversion", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": 529090, "kind": "param", "name": "easting", "orig": "easting", "reqd": true, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "example": 179645, "kind": "param", "name": "northing", "orig": "northing", "reqd": true, "type": "`$INTEGER`", "index$": 1 }] }, "contract": { "id": "GET /bng2latlong/{easting}/{northing}", "json": "{\"operationId\":\"convertBngToLatLongJson\",\"parameters\":[{\"description\":\"The easting coordinate in OSGB36 format (British National Grid). Must be a positive integer within valid range.\",\"in\":\"path\",\"name\":\"easting\",\"required\":true,\"schema\":{\"example\":529090,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"The northing coordinate in OSGB36 format (British National Grid). Must be a positive integer within valid range.\",\"in\":\"path\",\"name\":\"northing\",\"required\":true,\"schema\":{\"example\":179645,\"minimum\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"error\":{\"summary\":\"Invalid coordinates\",\"value\":{\"error\":\"Both <easting> and <northing> must be provided, must be positive integers, and must be within range. Where provided, <format> must be \\\"xml\\\" or \\\"json\\\".\",\"status\":\"error\"}},\"success\":{\"summary\":\"Successful conversion\",\"value\":{\"easting\":326897,\"latitude\":55.95271,\"longitude\":-3.17227,\"northing\":673919,\"status\":\"ok\"}}},\"schema\":{\"oneOf\":[{\"properties\":{\"easting\":{\"description\":\"The easting provided to the API in the request\",\"type\":\"integer\"},\"latitude\":{\"description\":\"The latitude of the converted coordinates in WGS84 format\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"The longitude of the converted coordinates in WGS84 format\",\"format\":\"double\",\"type\":\"number\"},\"northing\":{\"description\":\"The northing provided to the API in the request\",\"type\":\"integer\"},\"status\":{\"description\":\"Status of the API response\",\"enum\":[\"ok\"],\"type\":\"string\"}},\"required\":[\"status\",\"easting\",\"northing\",\"latitude\",\"longitude\"],\"type\":\"object\"},{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"status\":{\"description\":\"Status of the API response\",\"enum\":[\"error\"],\"type\":\"string\"}},\"required\":[\"status\",\"error\"],\"type\":\"object\"}]}}},\"description\":\"Successful coordinate conversion\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/bng2latlong/{easting}/{northing}", "segments": [{ "lit": "bng2latlong" }, { "var": "easting" }, { "var": "northing" }], "select": { "exist": ["easting", "northing"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "example": 529090, "kind": "param", "name": "easting", "orig": "easting", "reqd": true, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "example": 179645, "kind": "param", "name": "northing", "orig": "northing", "reqd": true, "type": "`$INTEGER`", "index$": 1 }] }, "contract": { "id": "GET /bng2latlong/{easting}/{northing}/xml", "json": "{\"operationId\":\"convertBngToLatLongXml\",\"parameters\":[{\"description\":\"The easting coordinate in OSGB36 format (British National Grid). Must be a positive integer within valid range.\",\"in\":\"path\",\"name\":\"easting\",\"required\":true,\"schema\":{\"example\":529090,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"The northing coordinate in OSGB36 format (British National Grid). Must be a positive integer within valid range.\",\"in\":\"path\",\"name\":\"northing\",\"required\":true,\"schema\":{\"example\":179645,\"minimum\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/xml\":{\"examples\":{\"error\":{\"summary\":\"Invalid coordinates\",\"value\":\"<?xml version=\\\"1.0\\\" ?>\\n<result>\\n  <status>error</status>\\n  <error>Both &lt;easting&gt; and &lt;northing&gt; must be provided, must be positive integers, and must be within range. Where provided, &lt;format&gt; must be \\\"xml\\\" or \\\"json\\\".</error>\\n</result>\"},\"success\":{\"summary\":\"Successful conversion\",\"value\":\"<?xml version=\\\"1.0\\\" ?>\\n<result>\\n  <status>ok</status>\\n  <easting>326897</easting>\\n  <northing>673919</northing>\\n  <latitude>55.95271</latitude>\\n  <longitude>-3.17227</longitude>\\n</result>\"}},\"schema\":{\"oneOf\":[{\"properties\":{\"easting\":{\"description\":\"The easting provided to the API in the request\",\"type\":\"integer\"},\"latitude\":{\"description\":\"The latitude of the converted coordinates in WGS84 format\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"The longitude of the converted coordinates in WGS84 format\",\"format\":\"double\",\"type\":\"number\"},\"northing\":{\"description\":\"The northing provided to the API in the request\",\"type\":\"integer\"},\"status\":{\"description\":\"Status of the API response\",\"enum\":[\"ok\"],\"type\":\"string\"}},\"required\":[\"status\",\"easting\",\"northing\",\"latitude\",\"longitude\"],\"type\":\"object\",\"xml\":{\"name\":\"result\"}},{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"status\":{\"description\":\"Status of the API response\",\"enum\":[\"error\"],\"type\":\"string\"}},\"required\":[\"status\",\"error\"],\"type\":\"object\",\"xml\":{\"name\":\"result\"}}]}}},\"description\":\"Successful coordinate conversion\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/bng2latlong/{easting}/{northing}/xml", "segments": [{ "lit": "bng2latlong" }, { "var": "easting" }, { "var": "northing" }, { "lit": "xml" }], "select": { "exist": ["easting", "northing"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [["bng2latlong"]] }, "key$": "coordinate_conversion", "name__orig": "coordinate_conversion", "Name": "CoordinateConversion", "name_": "coordinate_conversion", "name-": "coordinate-conversion", "NAME": "COORDINATE_CONVERSION", "index$": 0 }, { "active": true, "entity": "coordinate_conversion", "key$": "BasicCoordinateConversionFlow", "kind": "basic", "name": "BasicCoordinateConversionFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "coordinate_conversion_ref01", "srcdatavar": "coordinate_conversion_ref01_data", "suffix": "_dt0" }, "match": { "easting": "easting01", "id": "coordinate_conversion01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-coordinate_conversion_ref01" } }], "index$": 0 }] }, 'CoordinateConversion');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let coordinate_conversion_ref01_data = Object.values(setup.data.existing.coordinate_conversion)[0];
        // LOAD
        const coordinate_conversion_ref01_ent = client.CoordinateConversion();
        const coordinate_conversion_ref01_match_dt0 = {};
        coordinate_conversion_ref01_match_dt0.id = coordinate_conversion_ref01_data.id;
        const coordinate_conversion_ref01_data_dt0 = (await coordinate_conversion_ref01_ent.load(coordinate_conversion_ref01_match_dt0)).data();
        (0, node_assert_1.default)(coordinate_conversion_ref01_data_dt0.id === coordinate_conversion_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/coordinate_conversion/CoordinateConversionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.Bng2latlongConverterSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['coordinate_conversion01', 'coordinate_conversion02', 'coordinate_conversion03', 'bng2latlong01', 'bng2latlong02', 'bng2latlong03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'BNG2LATLONG_CONVERTER_TEST_COORDINATE_CONVERSION_ENTID': idmap,
        'BNG2LATLONG_CONVERTER_TEST_LIVE': 'FALSE',
        'BNG2LATLONG_CONVERTER_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['BNG2LATLONG_CONVERTER_TEST_COORDINATE_CONVERSION_ENTID'];
    const live = 'TRUE' === env.BNG2LATLONG_CONVERTER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['BNG2LATLONG_CONVERTER_TEST_COORDINATE_CONVERSION_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.Bng2latlongConverterSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.BNG2LATLONG_CONVERTER_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=CoordinateConversionEntity.test.js.map