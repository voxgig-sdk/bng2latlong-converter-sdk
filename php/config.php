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
              'active' => true,
              'name' => 'easting',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'latitude',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'longitude',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'northing',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'status',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 4,
            ],
          ],
          'name' => 'coordinate_conversion',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'example' => 529090,
                        'kind' => 'param',
                        'name' => 'easting',
                        'orig' => 'easting',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                        'index$' => 0,
                      ],
                      [
                        'active' => true,
                        'example' => 179645,
                        'kind' => 'param',
                        'name' => 'northing',
                        'orig' => 'northing',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                        'index$' => 1,
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
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'example' => 529090,
                        'kind' => 'param',
                        'name' => 'easting',
                        'orig' => 'easting',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                        'index$' => 0,
                      ],
                      [
                        'active' => true,
                        'example' => 179645,
                        'kind' => 'param',
                        'name' => 'northing',
                        'orig' => 'northing',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                        'index$' => 1,
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
                  'index$' => 1,
                ],
              ],
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
