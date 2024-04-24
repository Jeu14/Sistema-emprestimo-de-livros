import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Loan } from "./Loan";

@Entity("Alunos")
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @ManyToMany(() => Loan, loan => loan.aluno)
  @JoinTable()
  emprestimos: Loan[];
}
