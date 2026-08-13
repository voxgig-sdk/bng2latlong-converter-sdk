# Bng2latlongConverter SDK feature factory

from bng2latlongconverter_sdk.feature.base_feature import Bng2latlongConverterBaseFeature
from bng2latlongconverter_sdk.feature.test_feature import Bng2latlongConverterTestFeature


def _make_feature(name):
    features = {
        "base": lambda: Bng2latlongConverterBaseFeature(),
        "test": lambda: Bng2latlongConverterTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
