import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from "typeorm";
import {User} from "./user.entity";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repository: Repository<User>) {}

    create(name: string, email: string, password: string){
        const user = this.repository.create({ name, email, password } as any);

        return this.repository.save(user);
    }

    findOne(id: number): Promise<User>{
        if (!id) {
            return null;
        }
        return this.repository.findOneBy({ id });
    }
    find(email: string): Promise<User[]> {
        return this.repository.findBy({ email });
    }
    async update(id: number, attributes: Partial<User>){
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        Object.assign(user, attributes);
        return this.repository.save(user);
    }

   async remove(id: number){
       const user = await this.findOne(id);
       if (!user) {
           throw new NotFoundException('user not found');
       }
       return this.repository.remove(user);
    }
}
