import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RidersController } from './riders.controller';
import { RidersService } from './riders.service';
import { Rider } from './riders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rider])],
  controllers: [RidersController],
  providers: [RidersService],
})
export class RidersModule {}
