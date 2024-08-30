import { IsString, IsIn, IsDateString, Validate, IsNotEmpty } from 'class-validator';
import { IsBase64Validator } from '../../utils/validation/Base64Validator';
import { TransformToUpperCase } from '../../utils/functions/TransformToUpperCase';


export class UploadMeasureDTO {
    @IsNotEmpty({ message: 'O campo image é obrigatório.' })
    @Validate(IsBase64Validator, { message: 'A imagem deve estar no formato base64.' })
    image: string;

    @IsNotEmpty({ message: 'O campo customer_code é obrigatório.' })
    @IsString({ message: 'O campo customer_code deve ser uma string.' })
    customer_code: string;

    @IsNotEmpty({ message: 'O campo measure_datetime é obrigatório.' })
    @IsDateString({}, { message: 'O campo measure_datetime deve estar em formato ISO 8601.' })
    measure_datetime: string;

    @IsNotEmpty({ message: 'O campo measure_type é obrigatório.' })
    @IsString({ message: 'O campo measure_type deve ser uma string.' })
    @TransformToUpperCase()
    @IsIn(['WATER', 'GAS'], { message: 'O campo measure_type deve ser "WATER" ou "GAS".' })
    measure_type: string;
}