
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

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
      }
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
              "parts": [
                "bng2latlong",
                "{easting}",
                "{northing}"
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
              }
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
              "parts": [
                "bng2latlong",
                "{easting}",
                "{northing}",
                "xml"
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
              }
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
  config
}

