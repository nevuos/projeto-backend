import { IMeasureRepository } from '../repositories/IMeasureRepository';
import { ConfirmationDuplicateException } from '../utils/exceptions/ConfirmationDuplicateException';
import { MeasureNotFoundException } from '../utils/exceptions/MeasureNotFoundException';
import { ConfirmMeasureDTO } from '../dtos/request/ConfirmMeasureDTO';
import { ERROR_MESSAGES } from '../utils/constants/error-messages';

export class ConfirmMeasure {
    private measureRepository: IMeasureRepository;

    constructor(measureRepository: IMeasureRepository) {
        this.measureRepository = measureRepository;
    }

    async execute(inputData: ConfirmMeasureDTO): Promise<{ success: boolean }> {
        try {
            const measure = await this.measureRepository.findById(inputData.measure_uuid);

            if (!measure) {
                throw new MeasureNotFoundException(ERROR_MESSAGES.MEASURE_NOT_FOUND);
            }

            if (measure.has_confirmed) {
                throw new ConfirmationDuplicateException(ERROR_MESSAGES.CONFIRMATION_DUPLICATE);
            }

            measure.measure_value = inputData.confirmed_value;
            measure.has_confirmed = true;

            await this.measureRepository.update(measure);

            return { success: true };
        } catch (error) {
            if (error instanceof MeasureNotFoundException || error instanceof ConfirmationDuplicateException) {
                throw error;
            }

            throw new MeasureNotFoundException(ERROR_MESSAGES.MEASURE_NOT_FOUND);
        }
    }
}