import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
    UsePipes, ValidationPipe
} from '@nestjs/common';
import {CarService} from "./car.service";
import {Car} from "./car.entity";
import {CreateCarDto} from "./dtos/CreateCarDto";
import { AuthGuard } from '../guards/auth.guard';
import {QueryDto} from "./dtos/QueryDto";
import {AuthAdminGuard} from "../guards/auth.admin.guard";

@Controller('car')
export class CarController {
    constructor(private repository: CarService) {
    }

    @Get('')
    @UseGuards(AuthGuard)
    async getCars(): Promise<Car[]> {
        return await this.repository.getAll();
    }

    @Get('/sort/orderby')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true}))
    async getSort(@Query() query: QueryDto): Promise<[Car[], number]> {
        return await this.repository.findByQuery(query);
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    async getById(@Param('id') id: number): Promise<Car> {
        const car = await this.repository.find(id);
        if(!car) throw new NotFoundException("Car not found with given id");

        return await this.repository.find(id)
    }

    @Get('/model/:name')
    @UseGuards(AuthGuard)
    async getByModelName(@Param('name') modelName: string): Promise<Car | null> {
        return await this.repository.findByModel(modelName)
    }

    @UseGuards(AuthAdminGuard)
    @Post('')
    addCar(@Body() {model, year, price, mileage} : CreateCarDto) {
        return this.repository.create(model, year, price, mileage)
    }

    @UseGuards(AuthAdminGuard)
    @Patch('/:id')
    async update(@Param('id') id: number, @Body() {model, year, price, mileage}: Partial<CreateCarDto>): Promise<{message: string}> {
        return await this.repository.update(id, {model, year, price, mileage})
    }

    @UseGuards(AuthAdminGuard)
    @Delete('/:id')
    async delete(@Param('id') id: number): Promise<Car> {
        return await this.repository.remove(id)
    }

}
