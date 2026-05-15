<?php
declare(strict_types=1);

// Bng2latlongConverter SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class Bng2latlongConverterFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new Bng2latlongConverterBaseFeature();
            case "test":
                return new Bng2latlongConverterTestFeature();
            default:
                return new Bng2latlongConverterBaseFeature();
        }
    }
}
