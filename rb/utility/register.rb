# Bng2latlongConverter SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

Bng2latlongConverterUtility.registrar = ->(u) {
  u.clean = Bng2latlongConverterUtilities::Clean
  u.done = Bng2latlongConverterUtilities::Done
  u.make_error = Bng2latlongConverterUtilities::MakeError
  u.feature_add = Bng2latlongConverterUtilities::FeatureAdd
  u.feature_hook = Bng2latlongConverterUtilities::FeatureHook
  u.feature_init = Bng2latlongConverterUtilities::FeatureInit
  u.fetcher = Bng2latlongConverterUtilities::Fetcher
  u.make_fetch_def = Bng2latlongConverterUtilities::MakeFetchDef
  u.make_context = Bng2latlongConverterUtilities::MakeContext
  u.make_options = Bng2latlongConverterUtilities::MakeOptions
  u.make_request = Bng2latlongConverterUtilities::MakeRequest
  u.make_response = Bng2latlongConverterUtilities::MakeResponse
  u.make_result = Bng2latlongConverterUtilities::MakeResult
  u.make_point = Bng2latlongConverterUtilities::MakePoint
  u.make_spec = Bng2latlongConverterUtilities::MakeSpec
  u.make_url = Bng2latlongConverterUtilities::MakeUrl
  u.param = Bng2latlongConverterUtilities::Param
  u.prepare_auth = Bng2latlongConverterUtilities::PrepareAuth
  u.prepare_body = Bng2latlongConverterUtilities::PrepareBody
  u.prepare_headers = Bng2latlongConverterUtilities::PrepareHeaders
  u.prepare_method = Bng2latlongConverterUtilities::PrepareMethod
  u.prepare_params = Bng2latlongConverterUtilities::PrepareParams
  u.prepare_path = Bng2latlongConverterUtilities::PreparePath
  u.prepare_query = Bng2latlongConverterUtilities::PrepareQuery
  u.result_basic = Bng2latlongConverterUtilities::ResultBasic
  u.result_body = Bng2latlongConverterUtilities::ResultBody
  u.result_headers = Bng2latlongConverterUtilities::ResultHeaders
  u.transform_request = Bng2latlongConverterUtilities::TransformRequest
  u.transform_response = Bng2latlongConverterUtilities::TransformResponse
}
