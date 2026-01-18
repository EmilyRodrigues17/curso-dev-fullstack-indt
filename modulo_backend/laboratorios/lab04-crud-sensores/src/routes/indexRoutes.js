import { Router } from "express";
import sensorRouter from "./sensorRoutes.js";
import userRouter from "./userRoutes.js";

const indexRoutes = Router();

//indexRoutes.use('/sensor', sensorRouter);
indexRoutes.use(sensorRouter);
indexRoutes.use(userRouter);

export default indexRoutes;