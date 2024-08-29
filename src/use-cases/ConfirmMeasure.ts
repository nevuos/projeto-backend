import { IMeasureRepository } from '../repositories/IMeasureRepository';
import { Measure } from '../entities/Measure';

export class ConfirmMeasure {
    private measureRepository: IMeasureRepository;

    constructor(measureRepository: IMeasureRepository) {
        this.measureRepository = measureRepository;
    }

    async execute(inputData: any) {
        const measure = await this.measureRepository.findById(inputData.measure_uuid);
        if (!measure) {
            throw new Error('Leitura não encontrada');
        }

        if (measure.has_confirmed) {
            throw new Error('Leitura já confirmada');
        }

        measure.measure_value = inputData.confirmed_value;
        measure.has_confirmed = true;

        await this.measureRepository.update(measure);

        return { success: true };
    }
}