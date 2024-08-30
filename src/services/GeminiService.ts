import { GoogleGenerativeAI } from "@google/generative-ai";
import { ERROR_MESSAGES } from '../utils/constants/error-messages';
import { GeminiApiKeyMissingException } from '../utils/exceptions/GeminiApiKeyMissingException';
import { GeminiApiErrorException } from '../utils/exceptions/GeminiApiErrorException';
import { ImageService } from './ImageService';
import { ImageProcessingService } from './ImageProcessingService';

export class GeminiService {
    private genAI: GoogleGenerativeAI;
    private imageService: ImageService;
    private imageProcessingService: ImageProcessingService;

    constructor() {
        const apiKey = process.env.GEMINI_API_KEY as string;
        if (!apiKey) {
            throw new GeminiApiKeyMissingException(ERROR_MESSAGES.GEMINI_API_KEY_MISSING);
        }
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.imageService = new ImageService();
        this.imageProcessingService = new ImageProcessingService();
    }

    async getMeasurementFromImage(base64Image: string, customerCode: string): Promise<{ measure_value: number, image_url: string }> {
        let compressedImage: string;
        let measureValue: number;
        let imageUrl: string;

        try {
            compressedImage = await this.imageProcessingService.compressAndResizeImage(base64Image);

            const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const result = await model.generateContent([
                {
                    inlineData: {
                        data: compressedImage,
                        mimeType: "image/jpeg"
                    }
                },
                { text: "Extract the reading from this water/gas meter." }
            ]);

            const measureValueText = result.response.candidates[0].content.parts[0].text;
            const match = measureValueText.match(/[\d.]+/);
            measureValue = match ? parseFloat(match[0].replace('.', '')) : NaN;

            if (isNaN(measureValue)) {
                throw new GeminiApiErrorException(ERROR_MESSAGES.INVALID_DATA);
            }

            imageUrl = this.imageService.saveImageLocally(compressedImage, customerCode);

        } catch (error) {
            if (error instanceof GeminiApiErrorException) {
                throw error;
            } else {
                throw new GeminiApiErrorException(ERROR_MESSAGES.GEMINI_API_ERROR);
            }
        }

        return { measure_value: measureValue, image_url: imageUrl };
    }
}