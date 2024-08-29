import { IsString, IsUUID, IsInt } from 'class-validator';

export class ConfirmMeasureDTO {
    @IsUUID()
    measure_uuid: string;

    @IsInt()
    confirmed_value: number;
}