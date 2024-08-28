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

@Entity('travel_comment')
export class TravelCommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  comment: string;

  @OneToOne(() => TravelEntity, (travel) => travel.comments)
  @JoinColumn({ name: 'travel_id' })
  travel: TravelEntity;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;
}
