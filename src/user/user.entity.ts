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

        const salt = randomBytes(8).toString("hex");
        const hash = (await scrypt(this.password, salt, 32)) as Buffer;
        this.password =  salt + "." + hash.toString("hex");
    }
    @Column()
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