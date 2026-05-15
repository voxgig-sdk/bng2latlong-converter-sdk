<?php
declare(strict_types=1);

// Bng2latlongConverter SDK utility: prepare_path

class Bng2latlongConverterPreparePath
{
    public static function call(Bng2latlongConverterContext $ctx): string
    {
        $point = $ctx->point;
        $parts = [];
        if ($point) {
            $p = \Voxgig\Struct\Struct::getprop($point, 'parts');
            if (is_array($p)) {
                $parts = $p;
            }
        }
        return \Voxgig\Struct\Struct::join($parts, '/', true);
    }
}
