import { IsOptional, IsIn } from 'class-validator';

export class ListMeasuresDTO {
    @IsOptional()
    measure_type?: string;
}