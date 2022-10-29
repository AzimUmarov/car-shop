import {Controller, Get} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import ShopCart from "./shop-cart.entity";
import {Repository} from "typeorm";
import {ShopCartService} from "./shop-cart.service";

@Controller('shop-cart')
export class ShopCartController {
    constructor(private shopCartService: ShopCartService) {
    }

    @Get()
    getAll(): Promise<[ShopCart[], number]> {
        return this.shopCartService.getAll();
    }

}
