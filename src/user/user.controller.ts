import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query} from '@nestjs/common';
import {AuthService} from './auth.service'
import {CreateUserDto} from "./dtos/create-user.dto";
import {UserDto} from "./dtos/user.dto";
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dtos/update-user.dto";


@Controller('user')
export class UserController {
    constructor(private authService: AuthService, private userService: UserService){}

    @Post("/signup")
    async createUser(@Body() {name, email, password}: CreateUserDto){
        return await this.authService.signup(name, email, password);
    }

    @Post("/login")
    async login(@Body() {email, password} : UserDto){
        return await this.authService.login(email, password);
    }

    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.userService.find(parseInt(id));
        if (!user)
            throw new NotFoundException('user not found');

        return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.userService.findByEmail(email);
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
