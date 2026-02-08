import { appDataSource } from "../database/appDataSource.js"
import { Categoria } from "../entities/Categoria.js"
import { AppError } from "../errors/AppError.js";

export default class CategoriaService {
    private categoriaRepository = appDataSource.getRepository(Categoria);

    public async findAll(): Promise<Categoria[]> {
        return this.categoriaRepository.find()
    };

    public async create(data: Categoria): Promise<Categoria> {
        const categoriaExiste = await this.categoriaRepository.findOne({
            where: {nome: data.nome}
        });

        if (categoriaExiste){
            throw new AppError(400, "Categoria já cadastrada.")
        }

        const novaCategoria = this.categoriaRepository.create(data);
        await this.categoriaRepository.save(novaCategoria);
        
        return novaCategoria
    };

    public async update(id: string, data: Partial<Categoria>): Promise<Categoria> {
        const validaCategoria = await this.categoriaRepository.findOneBy({ id });

        if (!validaCategoria) {
            throw new AppError(404, "Categoria não encontrada.")
        }

        const categoriaAtualizada = this.categoriaRepository.merge(validaCategoria, data);

        await this.categoriaRepository.save(categoriaAtualizada);

        return categoriaAtualizada;
    };

    public async delete(id: string): Promise<void> {
        const validaCategoria = await this.categoriaRepository.findOneBy({ id });

        if (!validaCategoria) {
            throw new AppError(404, "Categoria não encontrada.")
        }

        await this.categoriaRepository.remove(validaCategoria);
    };

}
