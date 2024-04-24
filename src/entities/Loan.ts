import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
import { Student } from "./Student";


@Entity("emprestimos")
export class Loan extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Book)
    livro: Book;

    @ManyToOne(() => Student)
    aluno: Student;

    @Column({ type: "boolean", default: false })
    devolvido: boolean;
}