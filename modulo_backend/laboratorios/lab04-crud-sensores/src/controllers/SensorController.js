import { sensorService } from "../services/sensorService.js";


class SensorController {
    constructor(serviceSensor){
        this.service = serviceSensor;
    }
    getAllSensores = async (req, res) => {
        // 1 - recupera os dados da nossa database
        const sensores = await this.service.getAll();
        // 2 - responder a requisição
        res.status(200).json({ status: "success", data: sensores });
    };


    insertNewSensor = async (req, res) => {
        try {
            const body = req.body;

            const newSensor = await this.service.insertNew(body);

            res.status(201).json({ status: "success", data: newSensor });
        }
        catch (error){
            const statusCode = error.status || 500;

            res.status(statusCode).json({ status: "fail", message: error.message});
        }
    };

    updateSensor = async (req, res) => {
        try {
            const body = req.body;

            const newInformation = await this.service.updateSensor(body);

            res.status(200).json({ status: "success", data: newInformation})
        }
        catch (error){
            const statusCode = error.status || 500;

            res.status(statusCode).json({ status: "fail", message: error.message})
        }
    };

    deleteSensor = async (req, res) => {
        try {
            const { id } = req.params;

            await this.service.deleteSensor(id);

            res.status(200).json({ status: "success", message: "Recurso Deletado!"});
        }
        catch (error){
            const statusCode = error.status || 500;

            res.status(statusCode).json({ status: "fail", message: error.message});
        }
    };
}

export const sensorController = new SensorController(sensorService);
