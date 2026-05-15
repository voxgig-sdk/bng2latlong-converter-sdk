# ProjectName SDK exists test

import pytest
from bng2latlongconverter_sdk import Bng2latlongConverterSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = Bng2latlongConverterSDK.test(None, None)
        assert testsdk is not None
