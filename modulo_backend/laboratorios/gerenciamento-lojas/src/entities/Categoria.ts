import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Produto } from "./Produto.js";


@Entity("categoria")
export class Categoria {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", nullable: false, unique: true})
    nome!: string;

    @Column({ type: "varchar", nullable: true})
    descricao: string;

    @CreateDateColumn({nullable: false})
    dataCriacao!: Date;

    @UpdateDateColumn({nullable: false})
    dataAtualizacao!: Date;

    @OneToMany(() => Produto, (produto) => produto.categoria)
    produtos!: Produto[];

}
