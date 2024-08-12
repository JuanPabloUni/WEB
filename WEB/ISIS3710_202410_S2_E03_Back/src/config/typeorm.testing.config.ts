import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../models/usuario.entity';
import { ProductoAgricolaEntity } from '../productos_agricolas/producto_agricola.entity';
import { ArtesaniasEntity } from '../artesanias/artesanias.entity';
import { TourEntity } from '../tour/tour.entity';
import { Finca } from '../fincas/fincas.entity';

export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [UsuarioEntity, ProductoAgricolaEntity, ArtesaniasEntity, TourEntity, Finca],
      synchronize: true,
      keepConnectionAlive: true 
    }),
    TypeOrmModule.forFeature([UsuarioEntity, ProductoAgricolaEntity, ArtesaniasEntity, TourEntity, Finca]),
  ];