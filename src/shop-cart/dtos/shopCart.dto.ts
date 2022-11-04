import {IsNumber} from "class-validator";

export class ShopCartDto {
    @IsNumber()
    carId: number;
}