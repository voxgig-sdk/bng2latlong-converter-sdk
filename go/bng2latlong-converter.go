package voxgigbng2latlongconvertersdk

import (
	"github.com/voxgig-sdk/bng2latlong-converter-sdk/core"
	"github.com/voxgig-sdk/bng2latlong-converter-sdk/entity"
	"github.com/voxgig-sdk/bng2latlong-converter-sdk/feature"
	_ "github.com/voxgig-sdk/bng2latlong-converter-sdk/utility"
)

// Type aliases preserve external API.
type Bng2latlongConverterSDK = core.Bng2latlongConverterSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type Bng2latlongConverterEntity = core.Bng2latlongConverterEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type Bng2latlongConverterError = core.Bng2latlongConverterError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCoordinateConversionEntityFunc = func(client *core.Bng2latlongConverterSDK, entopts map[string]any) core.Bng2latlongConverterEntity {
		return entity.NewCoordinateConversionEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewBng2latlongConverterSDK = core.NewBng2latlongConverterSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
