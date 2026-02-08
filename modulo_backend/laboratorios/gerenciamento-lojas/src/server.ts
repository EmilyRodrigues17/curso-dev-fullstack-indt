import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";


import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import errorHandler from "./middlewares/errorHandler.js";
import indexRouter from "./routes/index.routes.js";
import { appDataSource } from "./database/appDataSource.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6060;

app.set('trust proxy', 1);

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
}));

app.use(helmet({
    contentSecurityPolicy: true
}));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(compression({ threshold: 1024 }))

app.use('/api', indexRouter);

app.use(errorHandler)


appDataSource.initialize()
.then(() => {
    console.log("Conectou com o banco!")

    const entityNames = appDataSource.entityMetadatas.map(m => m.name);
    console.log("📂 Entidades carregadas pelo TypeORM:", entityNames);

    if (entityNames.length === 0) {
        console.warn("⚠️ ATENÇÃO: Nenhuma entidade foi encontrada. Verifique se a pasta 'src/entities/' contém arquivos .ts e se eles usam o decorador @Entity().");
    }

    app.listen(PORT, () => {
        console.log(`Server is running in port: ${PORT}`)
    })
})
.catch((error) => {
        console.log(error)
    })

