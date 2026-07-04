# Typed models for the Bng2latlongConverter SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class CoordinateConversion:
    easting: Optional[int] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    northing: Optional[int] = None
    status: Optional[str] = None


@dataclass
class CoordinateConversionLoadMatch:
    easting: int
    northing: int

