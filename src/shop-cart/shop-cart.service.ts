import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import ShopCart from "./shop-cart.entity";
import {Repository} from "typeorm";
import {raw} from "express";


@Injectable()
export class ShopCartService {
    constructor(@InjectRepository(ShopCart) private repository: Repository<ShopCart>) {
    }

    getAll(): Promise<[ShopCart[], number]> {
        return this.repository.findAndCount();
    }

    getById(id: number): Promise<ShopCart> {
        return this.repository.findOneBy({id});
    }

     create(userId: number, carId: number): ShopCart {
        return this.repository.create({carId});
     }

     async updateOrderStatus(id, orderStatus: ['onCart', 'pending', 'completed']): Promise<ShopCart> {
        const shopCart = await this.repository.findOne(id);
        shopCart.orderStatus = orderStatus;

        return await this.repository.save(shopCart);
     }

     async getAllOrders() {
        const shopCart = await this.repository.findMany({orderStatus: 'pending'});
     }

}
