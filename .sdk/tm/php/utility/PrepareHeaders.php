<?php
declare(strict_types=1);

// Bng2latlongConverter SDK utility: prepare_headers

class Bng2latlongConverterPrepareHeaders
{
    public static function call(Bng2latlongConverterContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
