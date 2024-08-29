import { Router } from 'express';
import { MeasureController } from '../controllers/MeasureController';

const routes = Router();
const measureController = new MeasureController();

// POST /upload
routes.post('/upload', measureController.uploadImage);

// PATCH /confirm
routes.patch('/confirm', measureController.confirmMeasure);

// GET /:customer_code/list
routes.get('/:customer_code/list', measureController.listMeasures);

export default routes;