import { Module } from '@nestjs/common';
import { JobApplicationController } from './job-application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplicationEntity } from './entities/jobapplication-entity';
import { WorkExperienceEntity } from './entities/workexperience-entity';
import { TechnicalExperienceEntity } from './entities/technicalexperience-entity';
import { LanguageEntity } from './entities/language-entity';
import { EducationEntity } from './entities/education-entity';
import { JobApplicationService } from './job-application.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JobApplicationEntity,
      EducationEntity,
      WorkExperienceEntity,
      LanguageEntity,
      TechnicalExperienceEntity,
    ]),
  ],
  controllers: [JobApplicationController],
  providers: [JobApplicationService],
})
export class JobApplicationModule {}
