import { IsString, IsIn, IsDateString, IsBase64 } from 'class-validator';

export class UploadMeasureDTO {
    @IsBase64()
    image: string;

    @IsString()
    customer_code: string;

    @IsDateString()
    measure_datetime: string;

    @IsIn(['WATER', 'GAS'], { message: 'measure_type must be either WATER or GAS' })
    measure_type: string;
}