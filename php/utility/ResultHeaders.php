<?php
declare(strict_types=1);

// Bng2latlongConverter SDK utility: result_headers

class Bng2latlongConverterResultHeaders
{
    public static function call(Bng2latlongConverterContext $ctx): ?Bng2latlongConverterResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
