import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import {
  TABLE_JOB_APPLICATION,
  TABLE_USER,
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
    name: 'name',
    type: 'varchar',
    isNullable: true,
  },
  {
    name: 'contact_number',
    type: 'bigint',
    isNullable: true,
  },
  {
    name: 'email',
    type: 'varchar',
    isNullable: true,
  },
  {
    name: 'gender',
    type: 'varchar',
    isNullable: true,
  },
  {
    name: 'preferredLocation',
    type: 'varchar',
    isNullable: true,
  },
  {
    name: 'expectedCTC',
    type: 'int',
    isNullable: true,
  },
  {
    name: 'currentCTC',
    type: 'int',
    isNullable: true,
  },
  {
    name: 'noticePeriod',
    type: 'int',
    isNullable: true,
  },
  {
    name: 'status',
    type: 'varchar',
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
export class CreateJobApplication1715841462886 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TABLE_JOB_APPLICATION,
        columns: columnsObjects,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_JOB_APPLICATION);
  }
}
