# Bng2latlongConverter SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module Bng2latlongConverterFeatures
  def self.make_feature(name)
    case name
    when "base"
      Bng2latlongConverterBaseFeature.new
    when "ratelimit"
      Bng2latlongConverterRatelimitFeature.new
    when "retry"
      Bng2latlongConverterRetryFeature.new
    when "test"
      Bng2latlongConverterTestFeature.new
    when "timeout"
      Bng2latlongConverterTimeoutFeature.new
    else
      Bng2latlongConverterBaseFeature.new
    end
  end
end
