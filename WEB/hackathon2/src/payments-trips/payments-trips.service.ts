/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from '../trips/trips.entity';
import { Payment } from '../payments/payments.entity';

@Injectable()
export class PaymentsTripsService {
  constructor(
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  async createPaymentForTrip(tripId: number, paymentData: Payment): Promise<Payment> {
    const trip = await this.tripRepository.findOne({ where: { id: tripId } });
    paymentData.trip = trip;
    return this.paymentRepository.save(paymentData);
  }

}
