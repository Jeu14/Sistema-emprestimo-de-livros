import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
