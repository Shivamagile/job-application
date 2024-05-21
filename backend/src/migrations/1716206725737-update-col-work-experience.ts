import { TABLE_WORK_EXPERIENCE } from '../common/constants/table-name.constant';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateColWorkExperience1716206725737
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Rename columns
    await queryRunner.renameColumn(TABLE_WORK_EXPERIENCE, 'start_time', 'from');
    await queryRunner.renameColumn(TABLE_WORK_EXPERIENCE, 'end_time', 'to');

    // Change column types from time to timestamp
    await queryRunner.query(`
      ALTER TABLE "${TABLE_WORK_EXPERIENCE}"
      ALTER COLUMN "from" TYPE timestamp USING TO_TIMESTAMP("from"::text, 'HH24:MI:SS'),
      ALTER COLUMN "to" TYPE timestamp USING TO_TIMESTAMP("to"::text, 'HH24:MI:SS');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert column types from timestamp to time

    await queryRunner.query(`
      ALTER TABLE "${TABLE_WORK_EXPERIENCE}"
      ALTER COLUMN "from" TYPE time USING TO_CHAR("from", 'HH24:MI:SS')::time,
      ALTER COLUMN "to" TYPE time USING TO_CHAR("to", 'HH24:MI:SS')::time;
    `);

    // Revert column names
    await queryRunner.renameColumn(TABLE_WORK_EXPERIENCE, 'from', 'start_time');
    await queryRunner.renameColumn(TABLE_WORK_EXPERIENCE, 'to', 'end_time');
  }
}
