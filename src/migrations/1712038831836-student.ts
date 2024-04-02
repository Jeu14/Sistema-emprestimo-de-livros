import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Student1712038831836 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: "Alunos",
            columns: [
                {
                    name: "id",
                    type: "serial",
                    isPrimary: true,
                },
                {
                    name: "nome",
                    type: "text",
                    isNullable: false,
                },
                {
                    name: "email",
                    type: "text",
                    isUnique: true,
                },
            ],
        });
        await queryRunner.createTable(table)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Alunos")
    }
}
