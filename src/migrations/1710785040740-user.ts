import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1710785040740 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: "usuarios",
            columns: [
                {
                    name: "id",
                    type: "serial",
                    isPrimary: true,
                },
                {
                    name: "nome",
                    type: "text",
                },
                {
                    name: "email",
                    type: "text",
                    isUnique: true,
                },
                {
                    name: "senha",
                    type: "text",
                },
            ],
        });
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("usuarios");
    }
}
