import { IsString, IsArray, ValidateNested, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

class MeasureDTO {
    @IsString()
    measure_uuid: string;

    @IsString()
    measure_datetime: string;

    @IsString()
    measure_type: string;

    @IsBoolean()
    has_confirmed: boolean;

    @IsString()
    image_url: string;
}

export class ListMeasuresResponseDTO {
    @IsString()
    customer_code: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MeasureDTO)
    measures: MeasureDTO[];
}