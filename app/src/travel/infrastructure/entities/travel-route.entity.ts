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

@Entity('travel_route')
export class TravelRouteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  from: string;

  @Column({ length: 500 })
  to: string;

  @OneToOne(() => TravelEntity, (travel) => travel.route)
  @JoinColumn({ name: 'travel_id' })
  travel: TravelEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
