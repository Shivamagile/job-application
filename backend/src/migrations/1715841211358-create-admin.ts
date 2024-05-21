import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';
import { TABLE_ADMIN } from '../common/constants/table-name.constant';

const columns = [
  {
    name: 'id',
    type: 'int',
    isPrimary: true,
    isGenerated: true,
    generationStrategy: 'increment',
  },
  {
    name: 'mobile_number',
    type: 'bigint',
    isNullable: true,
  },
  {
    name: 'email',
    type: 'varchar',
    isNullable: true,
  },
  {
    name: 'password',
    type: 'varchar',
    isNullable: true,
  },
  {
    name: 'name',
    type: 'varchar',
    isNullable: true,
  },
  {
    name: 'is_active',
    type: 'boolean',
    default: false,
  },
  {
    name: 'created_at',
    type: 'timestamp',
    default: 'CURRENT_TIMESTAMP',
  },
  {
    name: 'updated_at',
    type: 'timestamp',
    default: 'CURRENT_TIMESTAMP',
  },
];

const columnsObjects = columns.map((column) => {
  const { generationStrategy, ...rest } = column;
  if (generationStrategy) {
    return new TableColumn({
      ...rest,
      generationStrategy: generationStrategy as any, // Cast to any to bypass the type check
    });
  }
  return new TableColumn(rest);
});

export class CreateAdmin1715841211358 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if the "admin" table exists
    const adminTable = await queryRunner.hasTable('admin');
    if (!adminTable) {
      await queryRunner.createTable(
        new Table({
          name: TABLE_ADMIN,
          columns: columnsObjects,
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_ADMIN);
  }
}
