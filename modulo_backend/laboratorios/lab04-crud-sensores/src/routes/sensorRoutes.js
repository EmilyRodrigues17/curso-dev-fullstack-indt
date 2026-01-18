import { Router } from 'express';
import { sensorController } from '../controllers/SensorController.js';

const sensorRouter = Router();

sensorRouter.get('/sensor',sensorController.getAllSensores);

sensorRouter.post('/sensor', sensorController.insertNewSensor);

sensorRouter.put('/sensor/:id', sensorController.updateSensor);

sensorRouter.delete('/sensor/:id', sensorController.deleteSensor);

export default sensorRouter;