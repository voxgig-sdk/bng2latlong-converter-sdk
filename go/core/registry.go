package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCoordinateConversionEntityFunc func(client *Bng2latlongConverterSDK, entopts map[string]any) Bng2latlongConverterEntity

