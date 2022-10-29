import {IsNumber, IsOptional, IsString} from "class-validator";


export class QueryDto {
    @IsOptional()
    year: number;

    @IsOptional()
    year_from: number;

    @IsOptional()
    model: string;

    @IsOptional()
    mileage_from: number;

    @IsOptional()
    price_from: number;

    @IsOptional()
    limit: number;

    @IsOptional()
    offset: number;
}