import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Loan } from "./Loan";

@Entity("Alunos")
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @OneToMany(() => Loan, loan => loan.aluno_id)
  // @JoinTable()
  emprestimos: Loan[];
}
