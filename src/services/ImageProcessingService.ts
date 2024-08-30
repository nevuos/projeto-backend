import sharp from 'sharp';

export class ImageProcessingService {
    async compressAndResizeImage(base64Image: string): Promise<string> {
        const buffer = Buffer.from(base64Image, 'base64');
        const compressedBuffer = await sharp(buffer)
            .resize(1024, 1024, { fit: 'inside' })
            .jpeg({ quality: 80 })
            .toBuffer();
        return compressedBuffer.toString('base64');
    }
}