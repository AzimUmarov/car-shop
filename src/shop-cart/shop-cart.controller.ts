import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Session, UseGuards} from '@nestjs/common';
import ShopCart, {orderStatus as _orderStatus} from "./shop-cart.entity";
import {ShopCartService} from "./shop-cart.service";
import {ShopCartDto} from "./dtos/shopCart.dto";
import {AuthGuard} from "../guards/auth.guard";
import {AuthAdminGuard} from "../guards/auth.admin.guard";

@Controller('shop-cart')
export class ShopCartController {
    constructor(private shopCartService: ShopCartService) {
    }

    @Get()
    @UseGuards(AuthGuard)
    getAll(): Promise<[ShopCart[], number]> {
        return this.shopCartService.getAll();
    }

    @Get("orders")
    @UseGuards(AuthAdminGuard)
    getAllOrders(){
        return this.shopCartService.getByStatus(_orderStatus.PENDING);
    }

    @Get("card")
    @UseGuards(AuthGuard)
    getShoppingCart(){
        return this.shopCartService.getByStatus(_orderStatus.ON_CART);
    }

    @Get("completed")
    @UseGuards(AuthGuard)
    getCompleted(){
        return this.shopCartService.getByStatus(_orderStatus.COMPLETED);
    }


    @Get(":id")
    @UseGuards(AuthGuard)
    async getById(@Param("id") id: string){
        const item = await this.shopCartService.getById(parseInt(id));
        if(!item) throw new NotFoundException("item not found");

        return item;
    }

    @Post()
    @UseGuards(AuthGuard)
    create(@Body() { carId }: ShopCartDto, @Session() session: Record<string, any>) {
        this.shopCartService.create(session.user, carId);
    }

    @Patch(":id")
    @UseGuards(AuthAdminGuard)
    markAsCompleted(@Param("id") id: number){
        return this.shopCartService.updateOrderStatus(id, _orderStatus.COMPLETED);
    }

    @Post(":id")
    @UseGuards(AuthGuard)
    order(@Param("id") id: number){
        return this.shopCartService.updateOrderStatus(id, _orderStatus.PENDING);
    }

    @Delete(":id")
    @UseGuards(AuthAdminGuard)
    delete(@Param("id") id: number){
        return this.shopCartService.delete(id);
    }
}
