# Bng2latlongConverter SDK configuration


def make_config():
    return {
        "main": {
            "name": "Bng2latlongConverter",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.getthedata.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "coordinate_conversion": {},
            },
        },
        "entity": {
      "coordinate_conversion": {
        "fields": [
          {
            "name": "easting",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "latitude",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "longitude",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "northing",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "status",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
        ],
        "name": "coordinate_conversion",
        "op": {
          "load": {
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "example": 179645,
                      "kind": "param",
                      "name": "northing",
                      "orig": "northing",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/bng2latlong/{easting}/{northing}",
                "parts": [
                  "bng2latlong",
                  "{easting}",
                  "{northing}",
                ],
                "select": {
                  "exist": [
                    "easting",
                    "northing",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
              {
                "args": {
                  "params": [
                    {
                      "example": 529090,
                      "kind": "param",
                      "name": "easting",
                      "orig": "easting",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "example": 179645,
                      "kind": "param",
                      "name": "northing",
                      "orig": "northing",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/bng2latlong/{easting}/{northing}/xml",
                "parts": [
                  "bng2latlong",
                  "{easting}",
                  "{northing}",
                  "xml",
                ],
                "select": {
                  "exist": [
                    "easting",
                    "northing",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 1,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "bng2latlong",
            ],
          ],
        },
      },
    },
    }
