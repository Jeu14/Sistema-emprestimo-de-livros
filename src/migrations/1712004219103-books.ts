import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Books1712004219103 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: "livros",
            columns: [
                {
                    name: "id",
                    type: "serial",
                    isPrimary: true,
                },
                {
                    name: "titulo",
                    type: "text",
                    isNullable: false,
                },
                {
                    name: "autor",
                    type: "text",
                    isNullable: false,
                },
                {
                    name: "descricao",
                    type: "text",
                    isNullable: false,
                },
            ],
        });
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("livros");
    }
}
