import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class QueryParamsDto {
    @Transform(({ value }) => Number(value))
    @IsNumber()
    take: number = 30;
    
    @Transform(({ value }) => Number(value))
    @IsNumber()
    page: number = 1;
}
