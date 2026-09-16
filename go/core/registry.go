package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewCoordinateConversionEntityFunc func(client *Bng2latlongConverterSDK, entopts map[string]any) Bng2latlongConverterEntity

