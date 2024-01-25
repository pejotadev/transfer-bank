import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransactionsTable1706215333213 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "transactions",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "amount",
                    type: "decimal",
                    precision: 10,
                    scale: 2
                },
                {
                    name: "payer",
                    type: "char",
                    length: "36"
                },
                {
                    name: "payee",
                    type: "char",
                    length: "36"
                },
                {
                    name: "timestamp",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "status",
                    type: "enum",
                    enum: ["pending", "completed", "cancelled"],
                    default: "'pending'"
                },
                {
                    name: "payment_method",
                    type: "varchar"
                }
            ],
            foreignKeys: [
                {
                    columnNames: ["payer"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"]
                },
                {
                    columnNames: ["payee"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"]
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("transactions");
    }

}
