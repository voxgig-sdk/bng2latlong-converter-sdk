package core

type Bng2latlongConverterError struct {
	IsBng2latlongConverterError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewBng2latlongConverterError(code string, msg string, ctx *Context) *Bng2latlongConverterError {
	return &Bng2latlongConverterError{
		IsBng2latlongConverterError: true,
		Sdk:              "Bng2latlongConverter",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *Bng2latlongConverterError) Error() string {
	return e.Msg
}
