
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Bng2latlongConverter',
        slug: "bng2latlong-converter",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://api.getthedata.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      coordinate_conversion: {
      },

    }
  }


  entity = {
    "coordinate_conversion": {
      "fields": [
        {
          "name": "easting",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "latitude",
          "type": "`$NUMBER`"
        },
        {
          "name": "longitude",
          "type": "`$NUMBER`"
        },
        {
          "name": "northing",
          "type": "`$INTEGER`"
        },
        {
          "name": "status",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id",
        "parts": [
          "easting",
          "northing"
        ],
        "sep": "/"
      },
      "name": "coordinate_conversion",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": 529090,
                    "kind": "param",
                    "name": "easting",
                    "orig": "easting",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 179645,
                    "kind": "param",
                    "name": "northing",
                    "orig": "northing",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/bng2latlong/{easting}/{northing}",
              "segments": [
                {
                  "lit": "bng2latlong"
                },
                {
                  "var": "easting"
                },
                {
                  "var": "northing"
                }
              ],
              "select": {
                "exist": [
                  "easting",
                  "northing"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "bng2latlong",
                "{easting}",
                "{northing}"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "example": 529090,
                    "kind": "param",
                    "name": "easting",
                    "orig": "easting",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 179645,
                    "kind": "param",
                    "name": "northing",
                    "orig": "northing",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/bng2latlong/{easting}/{northing}/xml",
              "segments": [
                {
                  "lit": "bng2latlong"
                },
                {
                  "var": "easting"
                },
                {
                  "var": "northing"
                },
                {
                  "lit": "xml"
                }
              ],
              "select": {
                "exist": [
                  "easting",
                  "northing"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "bng2latlong",
                "{easting}",
                "{northing}",
                "xml"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "bng2latlong"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

