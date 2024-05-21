import { TABLE_TECHNICAL_EXPERIENCE } from '../common/constants/table-name.constant';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateColTechnicalExperience1716190908710
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Rename the column contact_number to contact
    await queryRunner.renameColumn(
      TABLE_TECHNICAL_EXPERIENCE,
      'experienceLevel',
      'level',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Rename the column contact_number to contact
    await queryRunner.renameColumn(
      TABLE_TECHNICAL_EXPERIENCE,
      'level',
      'experienceLevel',
    );
  }
}
