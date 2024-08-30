import 'reflect-metadata';
import express from 'express';
import { createExpressServer } from 'routing-controllers';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import { MeasureController } from './controllers/MeasureController';
import path from 'path';
import { ImageService } from './services/ImageService';
import { errorHandler } from './utils/error/ErrorHandler';

dotenv.config();

const app = createExpressServer({
    routePrefix: '/api',
    controllers: [MeasureController],
    validation: true,
    defaultErrorHandler: false,
});

app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(errorHandler);

const imageService = new ImageService();
setInterval(() => {
    imageService.cleanOldImages(1);
}, 60 * 60 * 1000);

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected!');
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error connecting to the database', error);
    });