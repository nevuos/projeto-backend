import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export class ImageService {
    private imagePath: string;

    constructor() {
        this.imagePath = path.join(__dirname, '../public/images');
        this.ensureDirectoryExistence(this.imagePath);
    }

    private ensureDirectoryExistence(dirPath: string) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }

    private getHash(data: Buffer): string {
        return crypto.createHash('sha256').update(data).digest('hex');
    }

    saveImageLocally(base64Image: string, customerCode: string): string {
        const buffer = Buffer.from(base64Image, 'base64');
        const imageHash = this.getHash(buffer);

        const customerDir = path.join(this.imagePath, customerCode);
        this.ensureDirectoryExistence(customerDir);

        const imageName = `${imageHash}.jpg`;
        const fullPath = path.join(customerDir, imageName);

        if (fs.existsSync(fullPath)) {
            return `/images/${customerCode}/${imageName}`;
        }

        fs.writeFileSync(fullPath, buffer);

        return `/images/${customerCode}/${imageName}`;
    }

    cleanOldImages(hours: number) {
        const customerDirs = fs.readdirSync(this.imagePath);

        customerDirs.forEach(customerDir => {
            const customerPath = path.join(this.imagePath, customerDir);
            const files = fs.readdirSync(customerPath);

            files.forEach(file => {
                const filePath = path.join(customerPath, file);
                const stats = fs.statSync(filePath);
                const now = new Date().getTime();
                const expirationTime = new Date(stats.ctime).getTime() + hours * 60 * 60 * 1000;

                if (now > expirationTime) {
                    fs.unlinkSync(filePath);
                }
            });
        });
    }
}