import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Car} from "./car.entity";


@Injectable()
export class CarService {
    constructor(@InjectRepository(Car) private repository: Repository<Car>) {}

    create(model: string, year: number, price: string, mileage: number){
        const car = this.repository.create({ model, year, price, mileage });
        return this.repository.save(car);
    }

    find(id: number): Promise<Car | null>{
        if (!id) {
            return null;
        }
        return this.repository.findOneBy({ id });
    }

    getAll(): Promise<Car[]>{
        return this.repository.find();
    }

    findByEmail(model: string): Promise<Car | null> {
        return this.repository.findOneBy({ model });
    }

    async update(id: number, attributes: Partial<Car>){
        const car = await this.find(id);
        if (!car) {
            throw new NotFoundException('car not found');
        }
        Object.assign(car, attributes);
        return await this.repository.update(car.id, car)
    }

    async remove(id: number){
        const car = await this.find(id);
        if (!car) {
            throw new NotFoundException('car not found');
        }
        return this.repository.remove(car);
    }
}
