import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class ConfirmMeasureDTO {
    @IsString({ message: 'O campo measure_uuid deve ser uma string válida.' })
    @IsNotEmpty({ message: 'O campo measure_uuid não pode estar vazio.' })
    measure_uuid: string;

    @IsInt({ message: 'O campo confirmed_value deve ser um número inteiro.' })
    @IsNotEmpty({ message: 'O campo confirmed_value não pode estar vazio.' })
    confirmed_value: number;
}