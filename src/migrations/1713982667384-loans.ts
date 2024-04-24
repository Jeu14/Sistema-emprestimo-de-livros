import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Loans1713982667384 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
			new Table({
				name: 'emprestimos',
				columns: [
					{
						name: 'id',
						type: 'serial',
                        isPrimary: true,
					},
					{
						name: 'aluno_id',
						type: 'integer',
                        isNullable: false,
					},
					{
						name: 'livro_id',
						type: 'integer',
                        isNullable: false
					},
					{
                        name: 'devolvido',
						type: 'boolean',
                        default: false
					},
				],
			})
		)

		await queryRunner.createForeignKeys('emprestimos', [
			new TableForeignKey({
				columnNames: ['aluno_id'],
				referencedTableName: 'Alunos',
				referencedColumnNames: ['id'],
			}),
			new TableForeignKey({
				columnNames: ['livro_id'],
				referencedTableName: 'livros',
				referencedColumnNames: ['id'],
			}),
		])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("emprestimos")
    }

}
