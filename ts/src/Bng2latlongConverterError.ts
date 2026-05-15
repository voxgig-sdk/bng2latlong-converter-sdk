
import { Context } from './Context'


class Bng2latlongConverterError extends Error {

  isBng2latlongConverterError = true

  sdk = 'Bng2latlongConverter'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  Bng2latlongConverterError
}

