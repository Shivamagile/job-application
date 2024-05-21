import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TABLE_EDUCATION } from '../../../common/constants/table-name.constant';
import { JobApplicationEntity } from './jobapplication-entity';

@Entity(TABLE_EDUCATION)
export class EducationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    (type) => JobApplicationEntity,
    (jobApplication) => jobApplication.educationDetails,
  )
  @JoinColumn({ name: 'jobApplicationId' })
  jobApplication: JobApplicationEntity;

  @Column()
  jobApplicationId: number;

  @Column()
  degree: string;

  @Column()
  boardUniversity: string;

  @Column()
  year: number;

  @Column()
  cgpaPercentage: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
