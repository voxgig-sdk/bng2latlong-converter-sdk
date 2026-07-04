-- Typed models for the Bng2latlongConverter SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class CoordinateConversion
---@field easting? number
---@field latitude? number
---@field longitude? number
---@field northing? number
---@field status? string

---@class CoordinateConversionLoadMatch
---@field easting number
---@field northing number

local M = {}

return M
