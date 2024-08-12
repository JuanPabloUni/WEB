/* eslint-disable prettier/prettier */


import { Controller, Param, Post } from '@nestjs/common';
import { DriversTripsService } from './drivers-trips.service';

@Controller('drivers-trips')
export class DriversTripsController {
  constructor(private readonly driverTripService: DriversTripsService) {}

  @Post(':driverId/:tripId')
  assignDriverToTrip(@Param('driverId') driverId: string, @Param('tripId') tripId: string): Promise<any> {
    return this.driverTripService.assignDriverToTrip(parseInt(driverId, 10), parseInt(tripId, 10));
  }

}
