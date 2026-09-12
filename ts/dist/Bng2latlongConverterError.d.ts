import { Context } from './Context';
declare class Bng2latlongConverterError extends Error {
    isBng2latlongConverterError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { Bng2latlongConverterError };
