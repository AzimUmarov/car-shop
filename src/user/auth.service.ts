import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {UserService} from "./user.service";
import {randomBytes, scrypt as _scrypt} from "crypto";
import {promisify} from "util";
import { User } from './user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async signup(name: string, email: string, password: string) {
        const user = await this.userService.find(email);
        if(user)
            throw new BadRequestException("Email already taken!")

        const salt = randomBytes(8).toString("hex");
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const result = salt + hash.toString("hex");

        return await this.userService.create(name, email, password);
    }

    async login(email: string, password: string){
        const user = await this.userService.find(email);
        if (!user[0]) {
            throw new NotFoundException('user not found');
        }

        const [salt, storedHash] = user[0].password.split('.');
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (storedHash !== hash.toString('hex'))
            throw new BadRequestException('bad password');

        return user;
    }


}
