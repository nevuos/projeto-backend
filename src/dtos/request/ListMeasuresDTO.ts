import { IsOptional, IsIn } from 'class-validator';

export class ListMeasuresDTO {
    @IsOptional()
    @IsIn(['WATER', 'GAS'], { message: 'measure_type must be either WATER or GAS' })
    measure_type?: string;
}