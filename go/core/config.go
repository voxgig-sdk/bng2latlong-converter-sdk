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
			"slug": "bng2latlong-converter",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
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
						"name": "id",
						"type": "`$STRING`",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
					"parts": []any{
						"easting",
						"northing",
					},
					"sep": "/",
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
								"segments": []any{
									map[string]any{
										"lit": "bng2latlong",
									},
									map[string]any{
										"var": "easting",
									},
									map[string]any{
										"var": "northing",
									},
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
								"parts": []any{
									"bng2latlong",
									"{easting}",
									"{northing}",
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
								"segments": []any{
									map[string]any{
										"lit": "bng2latlong",
									},
									map[string]any{
										"var": "easting",
									},
									map[string]any{
										"var": "northing",
									},
									map[string]any{
										"lit": "xml",
									},
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
								"parts": []any{
									"bng2latlong",
									"{easting}",
									"{northing}",
									"xml",
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
