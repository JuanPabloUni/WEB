/* eslint-disable prettier/prettier */

import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { TripsService } from './trips.service';
import { Trip } from './trips.entity';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  create(@Body() tripData: Trip): Promise<Trip> {
    return this.tripsService.createTrip(tripData);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Trip> {
    return this.tripsService.getTripById(parseInt(id, 10));
  }

}
