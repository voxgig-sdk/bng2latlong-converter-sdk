# Bng2latlongConverter SDK feature factory

from bng2latlongconverter_sdk.feature.base_feature import Bng2latlongConverterBaseFeature
from bng2latlongconverter_sdk.feature.ratelimit_feature import Bng2latlongConverterRatelimitFeature
from bng2latlongconverter_sdk.feature.retry_feature import Bng2latlongConverterRetryFeature
from bng2latlongconverter_sdk.feature.test_feature import Bng2latlongConverterTestFeature
from bng2latlongconverter_sdk.feature.timeout_feature import Bng2latlongConverterTimeoutFeature


_FEATURES = {
    "base": lambda: Bng2latlongConverterBaseFeature(),
    "ratelimit": lambda: Bng2latlongConverterRatelimitFeature(),
    "retry": lambda: Bng2latlongConverterRetryFeature(),
    "test": lambda: Bng2latlongConverterTestFeature(),
    "timeout": lambda: Bng2latlongConverterTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
