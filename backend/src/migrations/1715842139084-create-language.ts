import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import {
  TABLE_LANGUAGE,
  TABLE_JOB_APPLICATION,
} from '../common/constants/table-name.constant';

const columns = [
  {
    name: 'id',
    type: 'int',
    isPrimary: true,
    isGenerated: true,
    generationStrategy: 'increment',
  },
  {
    name: 'jobApplicationId',
    type: 'int',
    isNullable: true,
  },
  {
    name: 'language',
    type: 'varchar',
    isNullable: true,
  },
  {
    name: 'read',
    type: 'boolean',
    default: true,
  },
  {
    name: 'write',
    type: 'boolean',
    default: true,
  },
  {
    name: 'speak',
    type: 'boolean',
    default: true,
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

export class CreateLanguage1715842139084 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TABLE_LANGUAGE,
        columns: columnsObjects,
      }),
    );

    await queryRunner.createForeignKey(
      TABLE_LANGUAGE,
      new TableForeignKey({
        columnNames: ['jobApplicationId'],
        referencedTableName: TABLE_JOB_APPLICATION,
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_LANGUAGE);
  }
}
