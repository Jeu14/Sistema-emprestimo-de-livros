import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Loan } from "./Loan";

@Entity("livros")
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    autor: string;

    @Column()
    descricao: string;

    @ManyToMany(() => Loan, loan => loan.livro)
    @JoinTable()
    emprestimos: Loan[];
}
