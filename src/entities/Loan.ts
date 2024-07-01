import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
import { Student } from "./Student";


@Entity("emprestimos")
export class Loan extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Book, livro => livro.emprestimos)
    @JoinColumn({ name: 'livro_id' })
    livro_id: Book;

    @ManyToOne(() => Student, aluno => aluno.emprestimos)
    @JoinColumn({ name: 'aluno_id' })
    aluno_id: Student;

    @Column({ type: "boolean", default: false })
    devolvido: boolean;
}