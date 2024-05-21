import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TABLE_JOB_APPLICATION } from '../../../common/constants/table-name.constant';
import { EducationEntity } from './education-entity';
import { LanguageEntity } from './language-entity';
import { WorkExperienceEntity } from './workexperience-entity';
import { TechnicalExperienceEntity } from './technicalexperience-entity';
enum User_Status {
  Pending = 'pending',
  Accept = 'accept',
  Rejected = 'rejected',
}

enum User_Gender {
  Male = 'male',
  Female = 'female',
}

@Entity(TABLE_JOB_APPLICATION)
export class JobApplicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  contact: number;

  @Column()
  email: string;

  @Column({ enum: User_Gender })
  gender: string;

  @Column()
  preferredLocation: string;

  @Column()
  expectedCTC: number;

  @Column()
  currentCTC: number;

  @Column()
  noticePeriod: number;

  @Column({ enum: User_Status, default: User_Status.Pending })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    (type) => EducationEntity,
    (educationDetails) => educationDetails.jobApplication,
    { cascade: true },
  )
  educationDetails: EducationEntity[];

  @OneToMany(
    (type) => WorkExperienceEntity,
    (workExperience) => workExperience.jobApplication,
    { cascade: true },
  )
  workExperience: WorkExperienceEntity[];

  @OneToMany(
    (type) => LanguageEntity,
    (knownLanguages) => knownLanguages.jobApplication,
    { cascade: true },
  )
  knownLanguages: LanguageEntity[];

  @OneToMany(
    (type) => TechnicalExperienceEntity,
    (technicalExperience) => technicalExperience.jobApplication,
    { cascade: true },
  )
  technicalExperience: TechnicalExperienceEntity[];
}
