import {Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";

@Entity()
export default class ShopCart {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.shopCart)
    user: User;

    @Column()
    carId: number;


    @Column({ default: "onCart" })
    orderStatus: ['onCart', 'pending', 'completed'];
}