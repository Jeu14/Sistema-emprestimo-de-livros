import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("Alunos")
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nome: string

  @Column()
  email: string
}