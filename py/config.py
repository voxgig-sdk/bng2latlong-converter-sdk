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
            "auth": {
                "prefix": "Bearer",
            },
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
            "active": True,
            "name": "easting",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "latitude",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "longitude",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "northing",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "status",
            "req": False,
            "type": "`$STRING`",
            "index$": 4,
          },
        ],
        "name": "coordinate_conversion",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": 529090,
                      "kind": "param",
                      "name": "easting",
                      "orig": "easting",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "example": 179645,
                      "kind": "param",
                      "name": "northing",
                      "orig": "northing",
                      "reqd": True,
                      "type": "`$INTEGER`",
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
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": 529090,
                      "kind": "param",
                      "name": "easting",
                      "orig": "easting",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "example": 179645,
                      "kind": "param",
                      "name": "northing",
                      "orig": "northing",
                      "reqd": True,
                      "type": "`$INTEGER`",
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
                "index$": 1,
              },
            ],
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
