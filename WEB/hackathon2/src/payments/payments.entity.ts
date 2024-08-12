/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Trip } from '../trips/trips.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  paymentDate: Date;

  @OneToOne(() => Trip)
  @JoinColumn()
  trip: Trip;

}
