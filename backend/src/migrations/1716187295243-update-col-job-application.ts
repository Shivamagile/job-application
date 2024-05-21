import { TABLE_JOB_APPLICATION } from '../common/constants/table-name.constant';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateColJobApplication1716187295243
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Rename the column contact_number to contact
    await queryRunner.renameColumn(
      TABLE_JOB_APPLICATION,
      'contact_number',
      'contact',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert the column name from contact back to contact_number
    await queryRunner.renameColumn(
      TABLE_JOB_APPLICATION,
      'contact',
      'contact_number',
    );
  }
}
