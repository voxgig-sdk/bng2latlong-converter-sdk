# Bng2latlongConverter SDK utility: make_context
require_relative '../core/context'
module Bng2latlongConverterUtilities
  MakeContext = ->(ctxmap, basectx) {
    Bng2latlongConverterContext.new(ctxmap, basectx)
  }
end
