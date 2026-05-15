-- Bng2latlongConverter SDK error

local Bng2latlongConverterError = {}
Bng2latlongConverterError.__index = Bng2latlongConverterError


function Bng2latlongConverterError.new(code, msg, ctx)
  local self = setmetatable({}, Bng2latlongConverterError)
  self.is_sdk_error = true
  self.sdk = "Bng2latlongConverter"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function Bng2latlongConverterError:error()
  return self.msg
end


function Bng2latlongConverterError:__tostring()
  return self.msg
end


return Bng2latlongConverterError
