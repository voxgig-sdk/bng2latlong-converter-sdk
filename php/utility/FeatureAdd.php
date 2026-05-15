<?php
declare(strict_types=1);

// Bng2latlongConverter SDK utility: feature_add

class Bng2latlongConverterFeatureAdd
{
    public static function call(Bng2latlongConverterContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
