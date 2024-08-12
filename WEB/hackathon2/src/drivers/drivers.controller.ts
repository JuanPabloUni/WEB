/* eslint-disable prettier/prettier */

import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { Driver } from './drivers.entity';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  create(@Body() driverData: Driver): Promise<Driver> {
    return this.driversService.createDriver(driverData);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Driver> {
    return this.driversService.getDriverById(parseInt(id, 10));
  }

}