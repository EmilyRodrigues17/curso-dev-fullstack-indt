import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import userRouter from "./routes/userRoutes.js";
import { appDataSource } from "./datasource/appDataSource.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 6060;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use('/api', userRouter);

appDataSource.initialize().then(() => {
    console.log("Conectou com o banco.")

    app.listen(PORT, () => {
        console.log(`Server is running in port: ${PORT}`)
    })
    }).catch((error) => {
        console.log(error)
    })