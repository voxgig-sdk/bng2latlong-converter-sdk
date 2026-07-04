# frozen_string_literal: true

# Typed models for the Bng2latlongConverter SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# CoordinateConversion entity data model.
#
# @!attribute [rw] easting
#   @return [Integer, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] northing
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
CoordinateConversion = Struct.new(
  :easting,
  :latitude,
  :longitude,
  :northing,
  :status,
  keyword_init: true
)

# Request payload for CoordinateConversion#load.
#
# @!attribute [rw] easting
#   @return [Integer]
#
# @!attribute [rw] northing
#   @return [Integer]
CoordinateConversionLoadMatch = Struct.new(
  :easting,
  :northing,
  keyword_init: true
)

