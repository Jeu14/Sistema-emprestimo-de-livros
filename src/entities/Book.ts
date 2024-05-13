import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @OneToMany(() => Loan, loan => loan.livro_id)
    // @JoinTable()
    emprestimos: Loan[];
}
