
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { Bng2latlongConverterSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await Bng2latlongConverterSDK.test()
    equal(null !== testsdk, true)
  })

})
