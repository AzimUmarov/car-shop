import { Module } from '@nestjs/common';
import { ShopCartController } from './shop-cart.controller';
import { ShopCartService } from './shop-cart.service';

@Module({
  controllers: [ShopCartController],
  providers: [ShopCartService]
})
export class ShopCartModule {}
