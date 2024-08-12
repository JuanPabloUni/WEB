/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payments.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
  ) {}

  async createPayment(paymentData): Promise<Payment> {
    return this.paymentsRepository.save(paymentData);
  }

  async getPaymentById(id: number): Promise<Payment> {
    return this.paymentsRepository.findOne({ where: { id } });
  }

}
