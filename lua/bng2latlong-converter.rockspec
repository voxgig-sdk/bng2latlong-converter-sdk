package = "voxgig-sdk-bng2latlong-converter"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/bng2latlong-converter-sdk.git",
  tag = "lua/v0.0.1",
  dir = "bng2latlong-converter-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the bng2latlong Converter public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/bng2latlong-converter-sdk",
  issues_url = "https://github.com/voxgig-sdk/bng2latlong-converter-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "bng2latlong-converter" }
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["bng2latlong-converter_sdk"] = "bng2latlong-converter_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
