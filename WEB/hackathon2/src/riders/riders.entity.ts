/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Trip } from '../trips/trips.entity';

@Entity()
export class Rider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Trip, trip => trip.rider)
  trips: Trip[];

}
