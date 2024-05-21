import { TABLE_ADMIN } from 'src/common/constants/table-name.constant';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity(TABLE_ADMIN)
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mobile_number: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: false })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  // first_name: any;
}
