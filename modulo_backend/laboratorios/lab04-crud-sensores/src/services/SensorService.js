import { readSensorFile, writeSensorFile } from "../utils/sensorFile.js";

class SensorService {
    async getAll(){
        // chamar a funcao readFile
        const sensores = await readSensorFile();
        return sensores
    }

    async insertNew(body){
        const { id, localizacao, temp } = body;

        if (!id){
            const error = new Error("ID obrigatório!");
            error.status = 400;
            throw error;
        }

        const sensor = { id, localizacao, temp };

        const sensores = await this.getAll();

        const indexEncontrado = sensores.findIndex(item => item.id === sensor.id)

        if (indexEncontrado !== -1) {
            const error = new Error("Sensor já existente");
            error.status = 409;
            throw error;
        }

        sensores.push(sensor);

        await writeSensorFile(sensores);

        return sensor

    };

    async updateSensor(body){
        const { id, localizacao, temp } = body;

        const sensores = await this.getAll();
        if (!id){
            const error = new Error("ID obrigatório!");
            error.status = 400;
            throw error;
        }
        const sensorNovo = { id, localizacao, temp };
        const indexEncontrado = sensores.findIndex(item => item.id === sensorNovo.id)

        if (indexEncontrado === -1) {
            const error = new Error('Sensor não encontrado!');
            error.status = 404;
            throw error;
        }

        sensores[indexEncontrado] = { ...sensores[indexEncontrado], ...sensorNovo };

        await writeSensorFile(sensores);
    
        return sensores[indexEncontrado];
    };

    async deleteSensor(id){
        if (!id){
            const error = new Error("ID obrigatório!");
            error.status = 400;
            throw error;
        }

        const sensores = await this.getAll();

        const indexEncontrado = sensores.findIndex(item => item.id === id)

        if (indexEncontrado === -1) {
            const error = new Error('Sensor não encontrado!');
            error.status = 404;
            throw error;
        }

        const newSensores = sensores.filter(row => row.id !== id);

        await writeSensorFile(newSensores);
    };
};

// para nao perder contexto dos seus atributos e metodos
export const sensorService = new SensorService();