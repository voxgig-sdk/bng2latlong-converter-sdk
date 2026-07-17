-- Bng2latlongConverter SDK exists test

local sdk = require("bng2latlong-converter_sdk")

describe("Bng2latlongConverterSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
