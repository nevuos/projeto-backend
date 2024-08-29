import express from 'express';
import { AppDataSource } from './config/data-source';
import routes from './routes/routes';
import { errorHandler } from './utils/error/ErrorHandler';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected!');
    })
    .catch(error => {
        console.error('Error connecting to the database', error);
    });

app.use('/api', routes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});