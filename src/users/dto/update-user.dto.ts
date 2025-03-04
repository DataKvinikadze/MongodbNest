import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
        @IsString()
        @IsNotEmpty()
        firstName: string
        
        @IsString()
        @IsNotEmpty()
        lastName: string
    
        @IsString()
        @IsNotEmpty()
        email: string
    
        @IsNotEmpty()
        age: number
}
