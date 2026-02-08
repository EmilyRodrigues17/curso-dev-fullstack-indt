import { Router } from "express";
import produtoRouter from "./produtoRouter.js";
import categoriaRouter from "./categoriaRouter.js";


const indexRouter = Router();

indexRouter.use(produtoRouter);
indexRouter.use(categoriaRouter);


export default indexRouter;
