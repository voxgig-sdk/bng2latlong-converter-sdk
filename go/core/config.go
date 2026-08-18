package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Bng2latlongConverter",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.getthedata.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"coordinate_conversion": map[string]any{},
			},
		},
		"entity": map[string]any{
			"coordinate_conversion": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "easting",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "latitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "longitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "northing",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
				},
				"name": "coordinate_conversion",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 529090,
											"kind": "param",
											"name": "easting",
											"orig": "easting",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 179645,
											"kind": "param",
											"name": "northing",
											"orig": "northing",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/bng2latlong/{easting}/{northing}",
								"parts": []any{
									"bng2latlong",
									"{easting}",
									"{northing}",
								},
								"select": map[string]any{
									"exist": []any{
										"easting",
										"northing",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 529090,
											"kind": "param",
											"name": "easting",
											"orig": "easting",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 179645,
											"kind": "param",
											"name": "northing",
											"orig": "northing",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/bng2latlong/{easting}/{northing}/xml",
								"parts": []any{
									"bng2latlong",
									"{easting}",
									"{northing}",
									"xml",
								},
								"select": map[string]any{
									"exist": []any{
										"easting",
										"northing",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"bng2latlong",
						},
					},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
