import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TABLE_WORK_EXPERIENCE } from '../../../common/constants/table-name.constant';
import { JobApplicationEntity } from './jobapplication-entity';

@Entity(TABLE_WORK_EXPERIENCE)
export class WorkExperienceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    (type) => JobApplicationEntity,
    (jobApplication) => jobApplication.workExperience,
  )
  @JoinColumn({ name: 'jobApplicationId' })
  jobApplication: JobApplicationEntity;

  @Column()
  jobApplicationId: number;

  @Column()
  company: string;

  @Column()
  designation: string;

  @Column()
  from: Date;

  @Column()
  to: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
