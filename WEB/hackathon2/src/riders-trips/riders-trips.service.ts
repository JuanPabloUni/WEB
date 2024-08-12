/* eslint-disable prettier/prettier */


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from '../trips/trips.entity';
import { Rider } from '../riders/riders.entity';

@Injectable()
export class RidersTripsService {
  constructor(
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
    @InjectRepository(Rider)
    private riderRepository: Repository<Rider>,
  ) {}

  async assignRiderToTrip(riderId: number, tripId: number): Promise<Trip> {
    const rider = await this.riderRepository.findOne({ where: { id: riderId } });
    const trip = await this.tripRepository.findOne({ where: { id: tripId } });
    
    trip.rider = rider;
    return this.tripRepository.save(trip);
  }

}
