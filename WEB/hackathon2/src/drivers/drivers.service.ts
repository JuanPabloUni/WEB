/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './drivers.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private driversRepository: Repository<Driver>,
  ) {}

  async createDriver(driverData): Promise<Driver> {
    return this.driversRepository.save(driverData);
  }

  async getDriverById(id: number): Promise<Driver> {
    return this.driversRepository.findOne({ where: { id } });
  }

}
