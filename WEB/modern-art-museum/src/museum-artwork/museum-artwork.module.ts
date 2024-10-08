import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtworkEntity } from '../artwork/artwork.entity';
import { MuseumEntity } from '../museum/museum.entity';
import { MuseumArtworkService } from './museum-artwork.service';
import { MuseumArtworkController } from './museum-artwork.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MuseumEntity, ArtworkEntity])],
  providers: [MuseumArtworkService],
  controllers: [MuseumArtworkController],
})
export class MuseumArtworkModule {}
