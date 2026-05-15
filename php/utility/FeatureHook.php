<?php
declare(strict_types=1);

// Bng2latlongConverter SDK utility: feature_hook

class Bng2latlongConverterFeatureHook
{
    public static function call(Bng2latlongConverterContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
