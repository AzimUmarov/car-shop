import {
  Body,
  Controller,
  Delete,
  Get, HttpException, HttpStatus, NotAcceptableException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query, Session, UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import {AuthGuard} from "../guards/auth.guard";
import {AuthAdminGuard} from "../guards/auth.admin.guard";

@Controller('user')
@Serialize(UserDto)
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/signup')
  async createUser(@Body() { name, email, password }: CreateUserDto,  @Session() session: Record<string, any>) {
    const user = await this.authService.signup(name, email, password);
    session.user = user;

    return user;
  }

  @Post('/login')
  async login(@Body() { email, password }: Partial<CreateUserDto>, @Session() session: Record<string, any>): Promise<{message: string}> {
    const user = await this.authService.login(email, password);
    if(session.user)
      throw new NotAcceptableException("you already logged in");

    session.user = user;

    return {
      message: 'Login successful'
    }
  }

  @Delete('')
  @UseGuards(AuthGuard)
  async logout(@Session() session: Record<string, any>) {
    session.user = null;
    return {
      message: 'Logged out Successfully'
    }
  }


  @UseGuards(AuthGuard)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.find(parseInt(id));
    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  @Get()
  @UseGuards(AuthAdminGuard)
  findAllUsers() {
    return this.userService.getAll();
  }

  @Delete('/:id')
  @UseGuards(AuthAdminGuard)
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto, @Session() session: Record<string, any>) {
    const user = await this.userService.find(parseInt(id));

    if(session.user === user.email)
        return this.userService.update(parseInt(id), body);

    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
