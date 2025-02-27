import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './schema/expense.schema';
import { isValidObjectId, Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import path from 'path';
import { faker } from '@faker-js/faker';

@Injectable()
export class ExpensesService  {
  constructor(@InjectModel(Expense.name) private expenseModel: Model<Expense>,
  private usersService: UsersService
){}
  async create(createExpenseDto: CreateExpenseDto, userId: string) {
    const user = await this.usersService.findOne(userId)
    const newExpense = (await this.expenseModel.create({ ...createExpenseDto, user: userId }))
    await this.usersService.addExpense(user._id, newExpense._id)
    return newExpense
  }
  

  async findAll() {
    return await this.expenseModel.find().populate({path: "user", select: "email"})
  }

  async findOne(id: string) {
    const expense = await this.expenseModel.findById(id).populate({path: "user", select: "email"})
    if(!expense) throw new BadRequestException("not found")
    return expense
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
  if(!isValidObjectId(id)) throw new BadRequestException("invalid id")
    const expense =  await this.expenseModel.findByIdAndUpdate(id, updateExpenseDto, {new: true})
    if(!expense) throw new BadRequestException("not found")
    return expense
  }

  async remove(id: string, userId) {
    if(!isValidObjectId(id)) throw new BadRequestException("invalid id")
      const expense = await this.expenseModel.findByIdAndDelete(id)
      if(!expense) throw new BadRequestException("not found")
      const user = await this.usersService.findOne(userId)
      await this.usersService.deleteExpense(user._id, expense._id)
      return expense
  }
}
