import { TABLE_JOB_APPLICATION } from '../common/constants/table-name.constant';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddAddressJobApplication1716184144667
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      TABLE_JOB_APPLICATION,
      new TableColumn({
        name: 'address',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      TABLE_JOB_APPLICATION,
      new TableColumn({
        name: 'address',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }
}
