<?php
declare(strict_types=1);

// Bng2latlongConverter SDK utility: prepare_body

class Bng2latlongConverterPrepareBody
{
    public static function call(Bng2latlongConverterContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
