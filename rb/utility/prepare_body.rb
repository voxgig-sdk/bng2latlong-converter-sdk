# Bng2latlongConverter SDK utility: prepare_body
module Bng2latlongConverterUtilities
  PrepareBody = ->(ctx) {
    ctx.op.input == "data" ? ctx.utility.transform_request.call(ctx) : nil
  }
end
