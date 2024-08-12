/* eslint-disable prettier/prettier */

import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { RidersService } from './riders.service';
import { Rider } from './riders.entity';

@Controller('riders')
export class RidersController {
  constructor(private readonly ridersService: RidersService) {}

  @Post()
  create(@Body() riderData: Rider): Promise<Rider> {
    return this.ridersService.createRider(riderData);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Rider> {
    return this.ridersService.getRiderById(parseInt(id, 10));
  }

}