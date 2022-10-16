import { Expose } from 'class-transformer';

export class UserDto {

    @Expose()
    email: string;

    @Expose()
    password: string;
}