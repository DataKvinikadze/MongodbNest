import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryParamsDto } from './dto/query-params.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: QueryParamsDto) {
    console.log(query)
    return this.usersService.findAll(query);
  }

  @Get('by-age')
  findByAge(
    @Query('age') age?: number,
    @Query('ageFrom') ageFrom?: number,
    @Query('ageTo') ageTo?: number,  
    @Query('limit') limit: number = 10
  ) {
    return this.usersService.findByAge(age, ageFrom, ageTo);
  }

    @Get("count")
    findAmount(){
    const count = this.usersService.findAmount()
    return count
    }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
