<?php
declare(strict_types=1);

// Bng2latlongConverter SDK utility: done

class Bng2latlongConverterDone
{
    public static function call(Bng2latlongConverterContext $ctx): array
    {
        if ($ctx->ctrl->explain) {
            $ctx->ctrl->explain = ($ctx->utility->clean)($ctx, $ctx->ctrl->explain);
            $er = $ctx->ctrl->explain['result'] ?? null;
            if (is_array($er)) {
                unset($ctx->ctrl->explain['result']['err']);
            }
        }
        if ($ctx->result && $ctx->result->ok) {
            $resdata = $ctx->result->resdata;
            if (is_object($resdata)) {
                $resdata = (array)$resdata;
            }
            return [$resdata, null];
        }
        return ($ctx->utility->make_error)($ctx, null);
    }
}
