import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TABLE_TECHNICAL_EXPERIENCE } from '../../../common/constants/table-name.constant';
import { JobApplicationEntity } from './jobapplication-entity';

@Entity(TABLE_TECHNICAL_EXPERIENCE)
export class TechnicalExperienceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    (type) => JobApplicationEntity,
    (jobApplication) => jobApplication.technicalExperience,
  )
  @JoinColumn({ name: 'jobApplicationId' })
  jobApplication: JobApplicationEntity;

  @Column()
  jobApplicationId: number;

  @Column()
  technology: string;

  @Column()
  level: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
