import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm"

@Entity("Alunos")
export class Student extends BaseEntity {
  @PrimaryColumn()
  id: number

  @Column()
  nome: string

  @Column()
  email: string
}