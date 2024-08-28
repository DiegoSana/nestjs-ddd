import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TravelEntity } from './travel.entity';

@Entity('travel_driver')
export class TravelDriverEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  first_name: string;

  @Column({ length: 500 })
  last_name: string;

  @Column({ length: 500 })
  license: string;

  @OneToOne(() => TravelEntity, (travel) => travel.driver)
  @JoinColumn({ name: 'travel_id' })
  travel: TravelEntity;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;
}
