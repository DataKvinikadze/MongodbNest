import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, OnModuleInit } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { HasUserIdGuard } from './guards/hasUserId.guard';
import { request } from 'http';
import { faker } from '@faker-js/faker';

@Controller('expenses')
@UseGuards(HasUserIdGuard)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Req() request, @Body() createExpenseDto: CreateExpenseDto) {
    const userId = request.userId
    return this.expensesService.create(createExpenseDto,userId);
  }

  @Get()
  findAll() {
    return this.expensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Req() request, @Param('id') id: string) {
    const userId = request.userId
    return this.expensesService.remove(id, userId);
  }
}
