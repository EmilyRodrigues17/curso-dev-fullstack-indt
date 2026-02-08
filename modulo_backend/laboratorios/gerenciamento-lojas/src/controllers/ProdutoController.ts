import type { Request, Response } from "express";
import ProdutoService from "../services/ProdutoService.js";

export default class ProdutoController {
    private produtoService: ProdutoService;

    constructor(produtoService: ProdutoService){
        this.produtoService = produtoService;
    }

    public async getAllProdutos(req: Request, res: Response) {
        const produtos = await this.produtoService.findAll();

        res.status(200).json(produtos);
    };

    public async addNewProduto(req: Request, res: Response) {
        const produto = await this.produtoService.create(req.body);

        res.status(201).json(produto);
    };

    public async updateProdutoById(req: Request, res: Response) {
        const { id } = req.params;

        const produto = await this.produtoService.update(id as string, req.body);

        res.status(200).json(produto);
    };

    public async deleteProduto(req: Request, res: Response) {
        const { id } = req.params;

        await this.produtoService.delete(id as string);

        res.status(204).send("Produto deletado.")
    };
}