import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {UpdateUserDto} from "./dtos/update-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repository: Repository<User>) {}

    create(name: string, email: string, password: string){
        const user = this.repository.create({ name, email, password });
        return this.repository.save(user);
    }

    find(id: number): Promise<User>{
        if (!id) {
            return null;
        }
        return this.repository.findOneBy({ id });
    }
    findByEmail(email: string): Promise<User | null> {
        return this.repository.findOneBy({ email });
    }
    async update(id: number, attributes: Partial<UpdateUserDto>){
        const user = await this.find(id);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        Object.assign(user, attributes);
        return await this.repository.update(user.id, user)
    }

   async remove(id: number){
       const user = await this.find(id);
       if (!user) {
           throw new NotFoundException('user not found');
       }
       return this.repository.remove(user);
    }
}
