/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RidersModule } from './riders/riders.module';
import { DriversModule } from './drivers/drivers.module';
import { TripsModule } from './trips/trips.module';
import { PaymentsModule } from './payments/payments.module';
import { Rider } from './riders/riders.entity';
import { Driver } from './drivers/drivers.entity';
import { Trip } from './trips/trips.entity';
import { Payment } from './payments/payments.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriversTripsModule } from './drivers-trips/drivers-trips.module';
import { RidersTripsModule } from './riders-trips/riders-trips.module';
import { PaymentsTripsModule } from './payments-trips/payments-trips.module';

@Module({
  imports: [RidersModule, DriversModule, TripsModule, PaymentsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'uber',
      entities: [Rider, Driver, Trip, Payment],
      synchronize: true,
      keepConnectionAlive: true,
    }),
    DriversTripsModule,
    RidersTripsModule,
    PaymentsTripsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
