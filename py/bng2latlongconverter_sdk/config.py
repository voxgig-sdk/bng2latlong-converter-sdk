# Bng2latlongConverter SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


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
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
            "name": "id",
            "type": "`$STRING`",
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
        "id": {
          "field": "id",
          "name": "id",
          "parts": [
            "easting",
            "northing",
          ],
          "sep": "/",
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
                "segments": [
                  {
                    "lit": "bng2latlong",
                  },
                  {
                    "var": "easting",
                  },
                  {
                    "var": "northing",
                  },
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
                "parts": [
                  "bng2latlong",
                  "{easting}",
                  "{northing}",
                ],
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
                "segments": [
                  {
                    "lit": "bng2latlong",
                  },
                  {
                    "var": "easting",
                  },
                  {
                    "var": "northing",
                  },
                  {
                    "lit": "xml",
                  },
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
                "parts": [
                  "bng2latlong",
                  "{easting}",
                  "{northing}",
                  "xml",
                ],
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
