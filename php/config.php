<?php
declare(strict_types=1);

// Bng2latlongConverter SDK configuration

class Bng2latlongConverterConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Bng2latlongConverter",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.getthedata.com",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "coordinate_conversion" => [],
                ],
            ],
            "entity" => [
        'coordinate_conversion' => [
          'fields' => [
            [
              'name' => 'easting',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'latitude',
              'req' => false,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'longitude',
              'req' => false,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'northing',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'status',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 4,
            ],
          ],
          'name' => 'coordinate_conversion',
          'op' => [
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 529090,
                        'kind' => 'param',
                        'name' => 'easting',
                        'orig' => 'easting',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                        'active' => true,
                      ],
                      [
                        'example' => 179645,
                        'kind' => 'param',
                        'name' => 'northing',
                        'orig' => 'northing',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/bng2latlong/{easting}/{northing}',
                  'parts' => [
                    'bng2latlong',
                    '{easting}',
                    '{northing}',
                  ],
                  'select' => [
                    'exist' => [
                      'easting',
                      'northing',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 529090,
                        'kind' => 'param',
                        'name' => 'easting',
                        'orig' => 'easting',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                        'active' => true,
                      ],
                      [
                        'example' => 179645,
                        'kind' => 'param',
                        'name' => 'northing',
                        'orig' => 'northing',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/bng2latlong/{easting}/{northing}/xml',
                  'parts' => [
                    'bng2latlong',
                    '{easting}',
                    '{northing}',
                    'xml',
                  ],
                  'select' => [
                    'exist' => [
                      'easting',
                      'northing',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 1,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'bng2latlong',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return Bng2latlongConverterFeatures::make_feature($name);
    }
}
