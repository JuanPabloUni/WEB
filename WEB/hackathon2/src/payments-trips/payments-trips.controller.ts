/* eslint-disable prettier/prettier */

import { Controller, Param, Body, Post } from '@nestjs/common';
import { PaymentsTripsService } from './payments-trips.service';
import { Payment } from '../payments/payments.entity';

@Controller('payments-trips')
export class PaymentsTripsController {
  constructor(private readonly paymentTripService: PaymentsTripsService) {}

  @Post(':tripId')
  createPaymentForTrip(@Param('tripId') tripId: string, @Body() paymentData: Payment): Promise<Payment> {
    return this.paymentTripService.createPaymentForTrip(parseInt(tripId, 10), paymentData);
  }
}
