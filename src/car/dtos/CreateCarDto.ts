import {IsNumber, IsString} from 'class-validator';


export class CreateCarDto {

    @IsString()
    model: string;

    @IsNumber()
    year: number;

    @IsNumber()
    price: number;

    @IsNumber()
    mileage: number;
}