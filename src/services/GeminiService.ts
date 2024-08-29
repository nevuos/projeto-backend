import axios from 'axios';

export class GeminiService {
    private apiKey: string;

    constructor() {
        this.apiKey = process.env.GEMINI_API_KEY as string;

        if (!this.apiKey) {
            throw new Error('A chave da API do Gemini não foi encontrada. Verifique se a variável GEMINI_API_KEY está definida no .env');
        }
    }

    async getMeasurementFromImage(base64Image: string): Promise<any> {
        try {
            const response = await axios.post('https://api.gemini.example.com/vision', {
                image: base64Image
            }, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });

            return response.data;
        } catch (error) {
            console.error('Erro ao chamar a API do Gemini:', error);
            throw new Error('Erro ao processar a imagem com a API do Gemini');
        }
    }
}