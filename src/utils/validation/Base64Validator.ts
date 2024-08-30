import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isBase64', async: false })
export class IsBase64Validator implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments) {
        const base64Regex = /^[A-Za-z0-9+/]+[=]{0,2}$/;
        return typeof text === 'string' && base64Regex.test(text);
    }

    defaultMessage(args: ValidationArguments) {
        return 'A imagem deve estar no formato base64.';
    }
}