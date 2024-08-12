/* eslint-disable prettier/prettier */

import { Controller, Param, Post } from '@nestjs/common';
import { RidersTripsService } from './riders-trips.service';

@Controller('riders-trips')
export class RidersTripsController {
  constructor(private readonly riderTripService: RidersTripsService) {}

  @Post(':riderId/:tripId')
  assignRiderToTrip(@Param('riderId') riderId: string, @Param('tripId') tripId: string): Promise<any> {
    return this.riderTripService.assignRiderToTrip(parseInt(riderId, 10), parseInt(tripId, 10));
  }

}
