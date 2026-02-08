import { Router } from "express";
import ProdutoService from "../services/ProdutoService.js";
import ProdutoController from "../controllers/ProdutoController.js";
import { validarBody } from "../middlewares/validarBody.js";
import { createProdutoSchema } from "../validates/createProdutoSchema.js";

const produtoRouter = Router();
const produtoService = new ProdutoService();
const produtoController = new ProdutoController(produtoService);

produtoRouter.get('/produtos', (req, res) => produtoController.getAllProdutos(req, res));
produtoRouter.post('/produtos', validarBody(createProdutoSchema), (req, res) => produtoController.addNewProduto(req, res));
produtoRouter.put('/produtos/:id', (req, res) => produtoController.updateProdutoById(req, res));
produtoRouter.delete('/produtos/:id', (req, res) => produtoController.deleteProduto(req, res));

export default produtoRouter;
