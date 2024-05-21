import { TABLE_EDUCATION } from '../common/constants/table-name.constant';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateColEducation1716202607626 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Execute SQL to alter the column type to decimal
    await queryRunner.query(
      `ALTER TABLE education ALTER COLUMN "cgpaPercentage" TYPE DECIMAL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE education ALTER COLUMN "cgpaPercentage" TYPE INTEGER`,
    );
  }
}
