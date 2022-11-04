import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import ShopCart, {orderStatus} from "./shop-cart.entity";
import {Repository} from "typeorm";
import {orderStatus as _orderStatus } from "./shop-cart.entity"
import {User} from "../user/user.entity";

@Injectable()
export class ShopCartService {
    constructor(@InjectRepository(ShopCart) private repository: Repository<ShopCart>) {}

    getAll(): Promise<[ShopCart[], number]> {
        return this.repository.findAndCount();
    }

    async getById(id: number): Promise<ShopCart> {
        const item = await this.repository.findOneBy({id});
        if (!item) {
            throw new NotFoundException('item not found');
        }
        return item;
    }

     create(user: User, carId: number): Promise<ShopCart> {
         console.log(user)
         const item = this.repository.create({carId});
         item.user = user;
         return this.repository.save(item);
     }

    async delete(id: number) {
        const item = await this.getById(id);
        if (!item) {
            throw new NotFoundException('item not found');
        }
        return this.repository.remove(item);
    }
     async updateOrderStatus(id : number, orderStatus: _orderStatus): Promise<ShopCart> {
        const shopCart = await this.getById(id);
        shopCart.orderStatus = orderStatus;

        return await this.repository.save(shopCart);
     }

    async getByStatus(status: _orderStatus) {
        return await this.repository.find({
            where: {
                orderStatus: status
            }});
    }

}
