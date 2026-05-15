
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { Bng2latlongConverterSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('CoordinateConversionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when BNG2LATLONGCONVERTER_TEST_LIVE=TRUE.
  afterEach(liveDelay('BNG2LATLONGCONVERTER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Bng2latlongConverterSDK.test()
    const ent = testsdk.CoordinateConversion()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.BNG_LATLONG_CONVERTER_TEST_LIVE
    for (const op of ['load']) {
      if (maybeSkipControl(t, 'entityOp', 'coordinate_conversion.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set BNG_LATLONG_CONVERTER_TEST_COORDINATE_CONVERSION_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let coordinate_conversion_ref01_data = Object.values(setup.data.existing.coordinate_conversion)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const coordinate_conversion_ref01_ent = client.CoordinateConversion()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/coordinate_conversion/CoordinateConversionTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = Bng2latlongConverterSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['coordinate_conversion01','coordinate_conversion02','coordinate_conversion03','bng2latlong01','bng2latlong02','bng2latlong03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['BNG_LATLONG_CONVERTER_TEST_COORDINATE_CONVERSION_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'BNG_LATLONG_CONVERTER_TEST_COORDINATE_CONVERSION_ENTID': idmap,
    'BNG_LATLONG_CONVERTER_TEST_LIVE': 'FALSE',
    'BNG_LATLONG_CONVERTER_TEST_EXPLAIN': 'FALSE',
    'BNG_LATLONG_CONVERTER_APIKEY': 'NONE',
  })

  idmap = env['BNG_LATLONG_CONVERTER_TEST_COORDINATE_CONVERSION_ENTID']

  const live = 'TRUE' === env.BNG_LATLONG_CONVERTER_TEST_LIVE

  if (live) {
    client = new Bng2latlongConverterSDK(merge([
      {
        apikey: env.BNG_LATLONG_CONVERTER_APIKEY,
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.BNG_LATLONG_CONVERTER_TEST_EXPLAIN,
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
