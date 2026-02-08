import { appDataSource } from "../database/appDataSource.js";
import { Produto } from "../entities/Produto.js";
import { AppError } from "../errors/AppError.js";

export default class ProdutoService {
    private produtoRepository = appDataSource.getRepository(Produto);

    public async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find();
    };

    public async create(data: Produto): Promise<Produto> {
        const novoProduto = this.produtoRepository.create(data);

        await this.produtoRepository.save(novoProduto);
        return novoProduto;
    };

    public async update(id: string, data: Partial<Produto>): Promise<Produto> {
        const validaProduto = await this.produtoRepository.findOneBy({ id });
        if (!validaProduto) {
            throw new AppError(404, "Produto não encontrado")
        }

        const produtoAtualizado = this.produtoRepository.merge(validaProduto!, data);

        await this.produtoRepository.save(produtoAtualizado);

        return produtoAtualizado
    };

    public async delete(id: string): Promise<void> {
        const validaProduto = await this.produtoRepository.findOneBy({ id });
        if (!validaProduto) {
            throw new AppError(404, "Produto não encontrado.")
        }

        await this.produtoRepository.remove(validaProduto!);

    };

}
