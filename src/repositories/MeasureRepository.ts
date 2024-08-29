import { Measure } from '../entities/Measure';
import { AppDataSource } from '../config/data-source';

export class MeasureRepository {
    private ormRepository = AppDataSource.getRepository(Measure);

    async save(measure: Measure): Promise<Measure> {
        return await this.ormRepository.save(measure);
    }

    async findByCustomerCode(customerCode: string, measureType?: string): Promise<Measure[]> {
        const queryBuilder = this.ormRepository.createQueryBuilder('measure')
            .where('measure.customer_code = :customerCode', { customerCode });

        if (measureType) {
            queryBuilder.andWhere('measure.measure_type = :measureType', { measureType });
        }

        return await queryBuilder.getMany();
    }

    async findById(measureUUID: string): Promise<Measure | null> {
        return await this.ormRepository.findOne({ where: { measure_uuid: measureUUID } });
    }

    async update(measure: Measure): Promise<void> {
        await this.ormRepository.save(measure);
    }
}