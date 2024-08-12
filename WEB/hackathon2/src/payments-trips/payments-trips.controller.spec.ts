import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsTripsController } from './payments-trips.controller';

describe('PaymentsTripsController', () => {
  let controller: PaymentsTripsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsTripsController],
    }).compile();

    controller = module.get<PaymentsTripsController>(PaymentsTripsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
