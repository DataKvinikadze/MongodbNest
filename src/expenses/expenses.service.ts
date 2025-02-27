import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './schema/expense.schema';
import { isValidObjectId, Model } from 'mongoose';
import { retry } from 'rxjs';

@Injectable()
export class ExpensesService {
  constructor(@InjectModel("expense") private expenseModel: Model<Expense>){}
  
  async create(createExpenseDto: CreateExpenseDto, user: string) {
    const newExpense = await this.expenseModel.create({...createExpenseDto, user})
    return newExpense
  }

  async findAll() {
    return await this.expenseModel.find()
  }

  async findOne(id: string) {
    const expense = await this.expenseModel.findById(id)
    if(!expense) throw new BadRequestException("not found")
    return expense
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
  if(!isValidObjectId(id)) throw new BadRequestException("invalid id")
    const expense =  await this.expenseModel.findByIdAndUpdate(id, updateExpenseDto, {new: true})
    if(!expense) throw new BadRequestException("not found")
    return expense
  }

  async remove(id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("invalid id")
      const expense = await this.expenseModel.findByIdAndDelete(id)
      if(!expense) throw new BadRequestException("not found")
      return expense
  }
}
