# Bng2latlongConverter SDK utility: feature_add
module Bng2latlongConverterUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
