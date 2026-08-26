<?php
declare(strict_types=1);

// Bng2latlongConverter SDK configuration

class Bng2latlongConverterConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Bng2latlongConverter",
                "slug" => "bng2latlong-converter",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
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
              'name' => 'easting',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'latitude',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'longitude',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'northing',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'status',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'coordinate_conversion',
          'op' => [
            'load' => [
              'input' => 'data',
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
                      ],
                      [
                        'example' => 179645,
                        'kind' => 'param',
                        'name' => 'northing',
                        'orig' => 'northing',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
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
                      ],
                      [
                        'example' => 179645,
                        'kind' => 'param',
                        'name' => 'northing',
                        'orig' => 'northing',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
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
                ],
              ],
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
