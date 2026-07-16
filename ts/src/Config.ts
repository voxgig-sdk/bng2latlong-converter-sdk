
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


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: 'https://api.getthedata.com',

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
          "active": true,
          "name": "easting",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "latitude",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 1
        },
        {
          "active": true,
          "name": "longitude",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "northing",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "status",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        }
      ],
      "name": "coordinate_conversion",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": 529090,
                    "kind": "param",
                    "name": "easting",
                    "orig": "easting",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "example": 179645,
                    "kind": "param",
                    "name": "northing",
                    "orig": "northing",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 1
                  }
                ]
              },
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
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": 529090,
                    "kind": "param",
                    "name": "easting",
                    "orig": "easting",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "example": 179645,
                    "kind": "param",
                    "name": "northing",
                    "orig": "northing",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 1
                  }
                ]
              },
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
              },
              "index$": 1
            }
          ],
          "key$": "load"
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

