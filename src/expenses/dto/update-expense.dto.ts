import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDto } from './create-expense.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateExpenseDto {
      @IsString()
      @IsNotEmpty()
      title: string;
    
      @IsNumber()
      amount: number;
    
      @IsString()
      @IsNotEmpty()
      category: string;
    
}
