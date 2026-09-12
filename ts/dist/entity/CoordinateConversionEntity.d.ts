import { Bng2latlongConverterEntityBase } from '../Bng2latlongConverterEntityBase';
import type { Bng2latlongConverterSDK } from '../Bng2latlongConverterSDK';
import type { Control } from '../types';
import type { CoordinateConversion, CoordinateConversionLoadMatch } from '../Bng2latlongConverterTypes';
declare class CoordinateConversionEntity extends Bng2latlongConverterEntityBase<CoordinateConversion> {
    constructor(client: Bng2latlongConverterSDK, entopts: any);
    make(this: CoordinateConversionEntity): CoordinateConversionEntity;
    load(this: any, reqmatch?: CoordinateConversionLoadMatch, ctrl?: Control): Promise<CoordinateConversionEntity>;
}
export { CoordinateConversionEntity };
