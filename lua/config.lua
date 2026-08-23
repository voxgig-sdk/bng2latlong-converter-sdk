-- Bng2latlongConverter SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Bng2latlongConverter",
      slug = "bng2latlong-converter",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://api.getthedata.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["coordinate_conversion"] = {},
      },
    },
    entity = {
      ["coordinate_conversion"] = {
        ["fields"] = {
          {
            ["name"] = "easting",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "latitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "longitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "northing",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "status",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "coordinate_conversion",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = 529090,
                      ["kind"] = "param",
                      ["name"] = "easting",
                      ["orig"] = "easting",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 179645,
                      ["kind"] = "param",
                      ["name"] = "northing",
                      ["orig"] = "northing",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/bng2latlong/{easting}/{northing}",
                ["parts"] = {
                  "bng2latlong",
                  "{easting}",
                  "{northing}",
                },
                ["select"] = {
                  ["exist"] = {
                    "easting",
                    "northing",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = 529090,
                      ["kind"] = "param",
                      ["name"] = "easting",
                      ["orig"] = "easting",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 179645,
                      ["kind"] = "param",
                      ["name"] = "northing",
                      ["orig"] = "northing",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/bng2latlong/{easting}/{northing}/xml",
                ["parts"] = {
                  "bng2latlong",
                  "{easting}",
                  "{northing}",
                  "xml",
                },
                ["select"] = {
                  ["exist"] = {
                    "easting",
                    "northing",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "bng2latlong",
            },
          },
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
