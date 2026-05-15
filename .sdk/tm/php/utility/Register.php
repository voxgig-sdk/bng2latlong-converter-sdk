<?php
declare(strict_types=1);

// Bng2latlongConverter SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

Bng2latlongConverterUtility::setRegistrar(function (Bng2latlongConverterUtility $u): void {
    $u->clean = [Bng2latlongConverterClean::class, 'call'];
    $u->done = [Bng2latlongConverterDone::class, 'call'];
    $u->make_error = [Bng2latlongConverterMakeError::class, 'call'];
    $u->feature_add = [Bng2latlongConverterFeatureAdd::class, 'call'];
    $u->feature_hook = [Bng2latlongConverterFeatureHook::class, 'call'];
    $u->feature_init = [Bng2latlongConverterFeatureInit::class, 'call'];
    $u->fetcher = [Bng2latlongConverterFetcher::class, 'call'];
    $u->make_fetch_def = [Bng2latlongConverterMakeFetchDef::class, 'call'];
    $u->make_context = [Bng2latlongConverterMakeContext::class, 'call'];
    $u->make_options = [Bng2latlongConverterMakeOptions::class, 'call'];
    $u->make_request = [Bng2latlongConverterMakeRequest::class, 'call'];
    $u->make_response = [Bng2latlongConverterMakeResponse::class, 'call'];
    $u->make_result = [Bng2latlongConverterMakeResult::class, 'call'];
    $u->make_point = [Bng2latlongConverterMakePoint::class, 'call'];
    $u->make_spec = [Bng2latlongConverterMakeSpec::class, 'call'];
    $u->make_url = [Bng2latlongConverterMakeUrl::class, 'call'];
    $u->param = [Bng2latlongConverterParam::class, 'call'];
    $u->prepare_auth = [Bng2latlongConverterPrepareAuth::class, 'call'];
    $u->prepare_body = [Bng2latlongConverterPrepareBody::class, 'call'];
    $u->prepare_headers = [Bng2latlongConverterPrepareHeaders::class, 'call'];
    $u->prepare_method = [Bng2latlongConverterPrepareMethod::class, 'call'];
    $u->prepare_params = [Bng2latlongConverterPrepareParams::class, 'call'];
    $u->prepare_path = [Bng2latlongConverterPreparePath::class, 'call'];
    $u->prepare_query = [Bng2latlongConverterPrepareQuery::class, 'call'];
    $u->result_basic = [Bng2latlongConverterResultBasic::class, 'call'];
    $u->result_body = [Bng2latlongConverterResultBody::class, 'call'];
    $u->result_headers = [Bng2latlongConverterResultHeaders::class, 'call'];
    $u->transform_request = [Bng2latlongConverterTransformRequest::class, 'call'];
    $u->transform_response = [Bng2latlongConverterTransformResponse::class, 'call'];
});
