# Bng2latlongConverter SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Bng2latlongConverter",
            "slug": "bng2latlong-converter",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "type": "`$INTEGER`",
          },
          {
            "name": "latitude",
            "type": "`$NUMBER`",
          },
          {
            "name": "longitude",
            "type": "`$NUMBER`",
          },
          {
            "name": "northing",
            "type": "`$INTEGER`",
          },
          {
            "name": "status",
            "type": "`$STRING`",
          },
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 179645,
                      "kind": "param",
                      "name": "northing",
                      "orig": "northing",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
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
                    },
                    {
                      "example": 179645,
                      "kind": "param",
                      "name": "northing",
                      "orig": "northing",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
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
