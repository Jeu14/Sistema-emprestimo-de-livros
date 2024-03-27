import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("usuarios")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ unique: true })
    email: string;

    @Column()
    senha: string;
}
