import { Test, TestingModule } from '@nestjs/testing';
import { ShopCartController } from './shop-cart.controller';

describe('ShopCartController', () => {
  let controller: ShopCartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopCartController],
    }).compile();

    controller = module.get<ShopCartController>(ShopCartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
