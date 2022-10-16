import { Test, TestingModule } from '@nestjs/testing';
import { ShopCartService } from './shop-cart.service';

describe('ShopCartService', () => {
  let service: ShopCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopCartService],
    }).compile();

    service = module.get<ShopCartService>(ShopCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
