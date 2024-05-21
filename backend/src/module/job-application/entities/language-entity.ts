import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TABLE_LANGUAGE } from '../../../common/constants/table-name.constant';
import { JobApplicationEntity } from './jobapplication-entity';

enum UserGender {
  Male = 'male',
  Femaile = 'female',
}

@Entity(TABLE_LANGUAGE)
export class LanguageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    (type) => JobApplicationEntity,
    (jobApplication) => jobApplication.knownLanguages,
  )
  @JoinColumn({ name: 'jobApplicationId' })
  jobApplication: JobApplicationEntity;

  @Column()
  jobApplicationId: number;

  @Column()
  language: string;

  @Column({ default: false })
  read: boolean;

  @Column({ default: false })
  write: boolean;

  @Column({ default: false })
  speak: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
