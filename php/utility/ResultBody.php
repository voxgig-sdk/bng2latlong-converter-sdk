<?php
declare(strict_types=1);

// Bng2latlongConverter SDK utility: result_body

class Bng2latlongConverterResultBody
{
    public static function call(Bng2latlongConverterContext $ctx): ?Bng2latlongConverterResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
