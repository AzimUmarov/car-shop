import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, SelectQueryBuilder} from "typeorm";
import {Car} from "./car.entity";
import {QueryDto} from "./dtos/QueryDto";
const DEFAULT_LIMIT_FOR_GET_FROM_DB = 10;

@Injectable()
export class CarService {
    constructor(@InjectRepository(Car) private repository: Repository<Car>) {}

    create(model: string, year: number, price: number, mileage: number){
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

    async findByQuery(query: QueryDto): Promise<[Car[], number]> {
        const result = await this.repository.createQueryBuilder('car');
        result.where("1 = 1");

        if('year' in query)
            result.andWhere("car.year = :year", { year: query.year });
        if('year_from' in query)
            result.andWhere("car.year >= :year_from", { year: query.year_from });
        if('model' in query)
            result.andWhere("car.model = :model", { model: query.model });
        if('mileage_from' in query)
            result.where("car.mileage_from >= :mileage_from", { mileage_from: query.mileage_from });
        if('price_from' in query)
            result.where("car.price_from >= :price_from", { price_from: query.price_from });

        result.orderBy('car.year', 'DESC');
        result.limit(query.limit || DEFAULT_LIMIT_FOR_GET_FROM_DB);

        if('offset' in query)
            result.offset(query.offset);

        return await result.getManyAndCount();
    }

    findByModel(model: string): Promise<Car | null> {
        return this.repository.findOneBy({ model });
    }

    async update(id: number, attributes: Partial<Car>){
        const car = await this.find(id);
        if (!car) {
            throw new NotFoundException('car not found');
        }
        Object.assign(car, attributes);
        await this.repository.update(car.id, car);
        return {
            message: 'Updated'
        }
    }

    async remove(id: number){
        const car = await this.find(id);
        if (!car) {
            throw new NotFoundException('car not found');
        }
        return this.repository.remove(car);
    }

}
