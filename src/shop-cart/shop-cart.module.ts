import { Module } from '@nestjs/common';
import { ShopCartController } from './shop-cart.controller';
import { ShopCartService } from './shop-cart.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import ShopCart from "./shop-cart.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ShopCart])],
  controllers: [ShopCartController],
  providers: [ShopCartService]
})
export class ShopCartModule {}
