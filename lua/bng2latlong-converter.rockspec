package = "voxgig-sdk-bng2latlong-converter"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/bng2latlong-converter-sdk.git"
}
description = {
  summary = "Bng2latlongConverter SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
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
