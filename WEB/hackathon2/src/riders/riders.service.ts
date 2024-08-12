/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rider } from './riders.entity';

@Injectable()
export class RidersService {
  constructor(
    @InjectRepository(Rider)
    private ridersRepository: Repository<Rider>,
  ) {}

  async createRider(riderData): Promise<Rider> {
    return this.ridersRepository.save(riderData);
  }

  async getRiderById(id: number): Promise<Rider> {
    return this.ridersRepository.findOne({ where: { id } });
  }

}
