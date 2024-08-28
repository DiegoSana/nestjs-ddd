import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TravelEntity } from './travel.entity';

@Entity('travel_passenger')
export class TravelPassengerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  first_name: string;

  @Column({ length: 500 })
  last_name: string;

  @Column({ length: 500 })
  identification: string;

  @Column('int')
  user_id: number;

  @ManyToOne(() => TravelEntity, (travel) => travel.passengers)
  @JoinColumn({ name: 'travel_id' })
  travel: TravelEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
