import { Test, TestingModule } from '@nestjs/testing';
import { DriversTripsController } from './drivers-trips.controller';

describe('DriversTripsController', () => {
  let controller: DriversTripsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriversTripsController],
    }).compile();

    controller = module.get<DriversTripsController>(DriversTripsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
