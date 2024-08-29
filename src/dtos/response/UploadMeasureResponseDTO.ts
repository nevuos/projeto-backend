import { IsString, IsInt } from 'class-validator';

export class UploadMeasureResponseDTO {
    @IsString()
    image_url: string;

    @IsInt()
    measure_value: number;

    @IsString()
    measure_uuid: string;
}