/* eslint-disable prettier/prettier */

import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Payment } from './payments.entity';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() paymentData: Payment): Promise<Payment> {
    return this.paymentsService.createPayment(paymentData);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Payment> {
    return this.paymentsService.getPaymentById(parseInt(id, 10));
  }

}
