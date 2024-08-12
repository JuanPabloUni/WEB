import { Test, TestingModule } from '@nestjs/testing';
import { RidersTripsController } from './riders-trips.controller';

describe('RidersTripsController', () => {
  let controller: RidersTripsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RidersTripsController],
    }).compile();

    controller = module.get<RidersTripsController>(RidersTripsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
