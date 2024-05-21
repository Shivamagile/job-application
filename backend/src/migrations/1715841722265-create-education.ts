import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import {
  TABLE_EDUCATION,
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
    name: 'degree',
    type: 'varchar',
    isNullable: true,
  },
  {
    name: 'boardUniversity',
    type: 'varchar',
    isNullable: true,
  },
  {
    name: 'year',
    type: 'int',
    isNullable: true,
  },
  {
    name: 'cgpaPercentage',
    type: 'int',
    isNullable: true,
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
export class CreateEducation1715841722265 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TABLE_EDUCATION,
        columns: columnsObjects,
      }),
    );

    await queryRunner.createForeignKey(
      TABLE_EDUCATION,
      new TableForeignKey({
        columnNames: ['jobApplicationId'],
        referencedTableName: TABLE_JOB_APPLICATION,
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_EDUCATION);
  }
}
