/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from '../trips/trips.entity';
import { Driver } from '../drivers/drivers.entity';

@Injectable()
export class DriversTripsService {
  constructor(
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}

  async assignDriverToTrip(driverId: number, tripId: number): Promise<Trip> {
    const driver = await this.driverRepository.findOne({ where: { id: driverId } });
    const trip = await this.tripRepository.findOne({ where: { id: tripId } });
    
    trip.driver = driver;
    return this.tripRepository.save(trip);
  }

}
