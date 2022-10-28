import {AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    model: string;

    @Column()
    year: string;

    @Column()
    price: string;

    @Column()
    mileage: string;

    @AfterInsert()
    logInsert() {
        console.log("inserted Car with id: " + this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log("updated Car with id: " + this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log("removed Car with id: " + this.id);
    }
}