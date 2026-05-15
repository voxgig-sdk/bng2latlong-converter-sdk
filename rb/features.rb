# Bng2latlongConverter SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module Bng2latlongConverterFeatures
  def self.make_feature(name)
    case name
    when "base"
      Bng2latlongConverterBaseFeature.new
    when "test"
      Bng2latlongConverterTestFeature.new
    else
      Bng2latlongConverterBaseFeature.new
    end
  end
end
