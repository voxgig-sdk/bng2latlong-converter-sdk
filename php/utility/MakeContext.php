<?php
declare(strict_types=1);

// Bng2latlongConverter SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class Bng2latlongConverterMakeContext
{
    public static function call(array $ctxmap, ?Bng2latlongConverterContext $basectx): Bng2latlongConverterContext
    {
        return new Bng2latlongConverterContext($ctxmap, $basectx);
    }
}
