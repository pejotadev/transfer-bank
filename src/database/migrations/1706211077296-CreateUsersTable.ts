import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1706211077296 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'bigint',
                    length: '36',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid'
                },
                {
                    name: 'full_name',
                    type: 'varchar',
                },
                {
                    name: 'cpf_cnpj',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: 'user_type',
                    type: 'enum',
                    enum: ['common', 'merchant'],
                },
                {
                    name: 'balance',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    default: 0,
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
