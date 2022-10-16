import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query} from '@nestjs/common';
import { AuthService } from './auth.service'
import {CreateUserDto} from "./dtos/create-user.dto";
import { UserDto } from "./dtos/user.dto";
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dtos/update-user.dto";


@Controller('user')
export class UserController {
    constructor(private authService: AuthService, private userService: UserService){}

    @Post("/signup")
    async createUser({name, email, password}: CreateUserDto){
        const user = await this.authService.signup(name, email, password);
        return user;

        }

    @Post("/login")
    async login( {email, password} : UserDto){
        const user = await this.authService.login(email, password);
        return user;
    }

    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.userService.findOne(parseInt(id));
        if (!user)
            throw new NotFoundException('user not found');

        return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.userService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.userService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(parseInt(id), body);
    }
}
