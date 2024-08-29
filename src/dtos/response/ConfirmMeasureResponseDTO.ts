import { IsBoolean } from 'class-validator';

export class ConfirmMeasureResponseDTO {
    @IsBoolean()
    success: boolean;
}