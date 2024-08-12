/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Driver } from '../drivers/drivers.entity';
import { Rider } from '../riders/riders.entity';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startLocation: string;

  @Column()
  endLocation: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @ManyToOne(() => Driver, driver => driver.trips)
  driver: Driver;

  @ManyToOne(() => Rider, rider => rider.trips)
  rider: Rider;

}
