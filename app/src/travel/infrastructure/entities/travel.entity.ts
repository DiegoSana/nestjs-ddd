import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TravelDriverEntity } from './travel-driver.entity';
import { TravelRouteEntity } from './travel-route.entity';
import { TravelPassengerEntity } from './travel-passenger.entity';
import { TravelCommentEntity } from './travel-comment.entity';

@Entity('travel')
export class TravelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  status: number;

  @CreateDateColumn()
  date: Date;

  @OneToOne(() => TravelDriverEntity, (driver) => driver.travel, {
    cascade: ['insert'],
  })
  driver: TravelDriverEntity;

  @OneToOne(() => TravelRouteEntity, (route) => route.travel, {
    cascade: ['insert'],
  })
  route: TravelRouteEntity;

  @OneToMany(
    () => TravelPassengerEntity,
    (travelPassengerEntity) => travelPassengerEntity.travel
  )
  passengers: TravelPassengerEntity[];

  @OneToMany(
    () => TravelCommentEntity,
    (travelCommentEntity) => travelCommentEntity.travel
  )
  comments: TravelCommentEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
