/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './trips.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private tripsRepository: Repository<Trip>,
  ) {}

  async createTrip(tripData): Promise<Trip> {
    return this.tripsRepository.save(tripData);
  }

  async getTripById(id: number): Promise<Trip> {
    return this.tripsRepository.findOne({ where: { id } });
  }

}
