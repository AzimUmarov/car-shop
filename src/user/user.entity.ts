import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';
import {randomBytes, scrypt as _scrypt} from "crypto";
import {promisify} from "util";
import {MaxLength} from "class-validator";
import {encrypt} from "../utils/passwordCrypto";

const scrypt = promisify(_scrypt);

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if(this.password.length > 32) return;

        this.password =  await encrypt(this.password);
    }
    @Column()
    @MaxLength(32)
    password: string;

    @Column()
    email: string;

    @Column({default: false})
    isAdmin: boolean;

    @AfterInsert()
    logInsert() {
        console.log("inserted User with id: " + this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log("updated User with id: " + this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log("removed User with id: " + this.id);
    }
}