import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminEntity } from 'src/module/admin/admin-auth/entities/admin-entity';
import { JobApplicationEntity } from 'src/module/job-application/entities/jobapplication-entity';
import { EducationEntity } from 'src/module/job-application/entities/education-entity';
import { TechnicalExperienceEntity } from 'src/module/job-application/entities/technicalexperience-entity';
import { WorkExperienceEntity } from 'src/module/job-application/entities/workexperience-entity';
import { LanguageEntity } from 'src/module/job-application/entities/language-entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const options: TypeOrmModuleOptions = {
          type: 'postgres',
          ssl: JSON.parse(configService.get('database.postgres.enableSSL')),
          host: configService.get<string>('database.postgres.host'),
          port: configService.get<number>('database.postgres.port'),
          username: configService.get<string>('database.postgres.user'),
          password: configService.get<string>('database.postgres.password'),
          database: configService.get<string>('database.postgres.name'),
          entities: [
            AdminEntity,
            JobApplicationEntity,
            EducationEntity,
            LanguageEntity,
            TechnicalExperienceEntity,
            WorkExperienceEntity,
          ],
          synchronize: false,
        };
        return options;
      },
    }),
    // TypeOrmModule.forFeature(entities, 'user-db'),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
