/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from '../trips/trips.entity';
import { Rider } from '../riders/riders.entity';
import { RidersTripsController } from './riders-trips.controller';
import { RidersTripsService } from './riders-trips.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trip, Rider])],
  controllers: [RidersTripsController],
  providers: [RidersTripsService],
})
export class RidersTripsModule {}