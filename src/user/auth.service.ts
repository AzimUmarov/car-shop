import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {UserService} from "./user.service";
import {randomBytes, scrypt as _scrypt} from "crypto";
import {promisify} from "util";
import {checkCrypt} from "../utils/passwordCrypto";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async signup(name: string, email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if(user)
            throw new BadRequestException("Email already taken!")

        return await this.userService.create(name, email, password);
    }

    async login(email: string, password: string){
        const user = await this.userService.findByEmail(email);
        if (!user)
            throw new NotFoundException('user not found');

        if (await checkCrypt(password, user.password))
            throw new BadRequestException('bad password');

        return user;
    }

}
