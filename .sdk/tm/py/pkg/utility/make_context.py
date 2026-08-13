# Bng2latlongConverter SDK utility: make_context

from projectname_sdk.core.context import Bng2latlongConverterContext


def make_context_util(ctxmap, basectx):
    return Bng2latlongConverterContext(ctxmap, basectx)
