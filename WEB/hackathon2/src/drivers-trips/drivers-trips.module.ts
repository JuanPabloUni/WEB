import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from '../trips/trips.entity';
import { Driver } from '../drivers/drivers.entity';
import { DriversTripsController } from './drivers-trips.controller';
import { DriversTripsService } from './drivers-trips.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trip, Driver])],
  controllers: [DriversTripsController],
  providers: [DriversTripsService],
})
export class DriversTripsModule {}
