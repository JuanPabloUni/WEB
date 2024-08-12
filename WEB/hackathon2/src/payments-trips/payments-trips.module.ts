/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from '../trips/trips.entity';
import { Payment } from '../payments/payments.entity';
import { PaymentsTripsController } from './payments-trips.controller';
import { PaymentsTripsService } from './payments-trips.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trip, Payment])],
  controllers: [PaymentsTripsController],
  providers: [PaymentsTripsService],
})
export class PaymentsTripsModule {}
