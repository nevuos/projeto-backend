import express from 'express';
import { AppDataSource } from './config/data-source';
import routes from './routes/routes';


const app = express();

app.use(express.json());


AppDataSource.initialize().then(() => {
    console.log('Database connected!');
}).catch(error => console.log('Error: ', error));


app.use('/api', routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
