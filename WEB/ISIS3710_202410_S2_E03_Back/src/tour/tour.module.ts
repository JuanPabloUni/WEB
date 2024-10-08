import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourEntity } from './tour.entity';
import { TourController } from './tour.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TourEntity])],
  providers: [TourService],
  controllers: [TourController]
})
export class TourModule {}
