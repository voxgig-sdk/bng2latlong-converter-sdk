# Bng2latlongConverter SDK exists test

require "minitest/autorun"
require_relative "../Bng2latlongConverter_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = Bng2latlongConverterSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
