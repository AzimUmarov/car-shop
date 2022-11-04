import {Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";

export enum orderStatus {
    ON_CART = "onCart",
    PENDING = "pending",
    COMPLETED = "completed",
}

@Entity()
export default class ShopCart {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.shopCart)
    user: User;

    @Column()
    carId: number;


    @Column({
        type: "varchar",
        enum: orderStatus,
        default: orderStatus.ON_CART
    })
    orderStatus: orderStatus;
}