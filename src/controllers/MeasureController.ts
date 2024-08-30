import { JsonController, Post, Patch, Get, Param, QueryParams, Body, HttpCode } from 'routing-controllers';
import { plainToInstance } from 'class-transformer';
import { UploadMeasureDTO } from '../dtos/request/UploadMeasureDTO';
import { ConfirmMeasureDTO } from '../dtos/request/ConfirmMeasureDTO';
import { UploadMeasureResponseDTO } from '../dtos/response/UploadMeasureResponseDTO';
import { ConfirmMeasureResponseDTO } from '../dtos/response/ConfirmMeasureResponseDTO';
import { ListMeasuresResponseDTO } from '../dtos/response/ListMeasuresResponseDTO';
import { MeasureRepository } from '../repositories/MeasureRepository';
import { GeminiService } from '../services/GeminiService';
import { UploadMeasure } from '../use-cases/UploadMeasure';
import { ConfirmMeasure } from '../use-cases/ConfirmMeasure';
import { ListMeasures } from '../use-cases/ListMeasures';
import { SUCCESS_MESSAGES } from '../utils/constants/success-messages';

@JsonController('/measures')
export class MeasureController {

    private geminiService: GeminiService;
    private measureRepository: MeasureRepository;

    constructor() {
        this.geminiService = new GeminiService();
        this.measureRepository = new MeasureRepository();
    }

    @Post('/upload')
    @HttpCode(200)
    async uploadImage(@Body({ options: { limit: '250mb' } }) dto: UploadMeasureDTO) {
        const uploadMeasure = new UploadMeasure(this.measureRepository, this.geminiService);
        const result = await uploadMeasure.execute(dto);
        return {
            ...plainToInstance(UploadMeasureResponseDTO, result),
            message: SUCCESS_MESSAGES.MEASURE_UPLOADED
        };
    }

    @Patch('/confirm')
    @HttpCode(200)
    async confirmMeasure(@Body() dto: ConfirmMeasureDTO) {
        const confirmMeasure = new ConfirmMeasure(this.measureRepository);
        await confirmMeasure.execute(dto);
        return plainToInstance(ConfirmMeasureResponseDTO, { success: true, message: SUCCESS_MESSAGES.MEASURE_CONFIRMED });
    }

    @Get('/:customer_code/list')
    @HttpCode(200)
    async listMeasures(@Param('customer_code') customer_code: string, @QueryParams() query: any) {
        const listMeasures = new ListMeasures(this.measureRepository);
        const result = await listMeasures.execute(customer_code, query.measure_type);
        return {
            customer_code,
            measures: plainToInstance(ListMeasuresResponseDTO, {
                customer_code,
                measures: result
            }),
            message: SUCCESS_MESSAGES.MEASURE_LISTED
        };
    }
}