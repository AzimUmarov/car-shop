import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CarModule } from './car/car.module';
import { ShopCartModule } from './shop-cart/shop-cart.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user/user.entity";
import {Car} from "./car/car.entity";
import ShopCart from "./shop-cart/shop-cart.entity";


@Module({
  imports: [UserModule, CarModule, ShopCartModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Car, ShopCart],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
