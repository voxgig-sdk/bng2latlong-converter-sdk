# Bng2latlongConverter SDK utility: result_body
module Bng2latlongConverterUtilities
  ResultBody = ->(ctx) {
    response = ctx.response
    result = ctx.result
    if result && response && response.json_func && response.body
      result.body = response.json_func.call
    end
    result
  }
end
