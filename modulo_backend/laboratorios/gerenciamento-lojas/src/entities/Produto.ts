import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Categoria } from "./Categoria.js";

@Entity("produto")
export class Produto {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", nullable: false})
    nome!: string;

    @Column({ type: "varchar", nullable: true})
    descricao: string;

    @Column({ type: "float", nullable: false})
    preco!: number;

    @Column({ type: "integer", nullable: false})
    estoque!: number;

    @CreateDateColumn({ nullable: false})
    dataCriacao!: Date;

    @UpdateDateColumn({ nullable: true})
    dataAtualizacao?: Date;

    @ManyToOne(() => Categoria, (categoria) => categoria.produtos)
    @JoinColumn({ name: "categoria_id" })
    categoria!: Categoria
}
