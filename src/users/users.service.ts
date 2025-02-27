import { BadRequestException, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isValidObjectId, Model } from 'mongoose';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { faker } from '@faker-js/faker';
import { UsersModule } from './users.module';
import { QueryParamsDto } from './dto/query-params.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectModel("user") private userModel: Model<User>){
  }

  async onModuleInit() {
      const count = await this.userModel.countDocuments();
      if (count === 0) {
        const usersList: any[] = [];
        for (let i = 0; i < 30_000; i++) {
          const user = {
            fullName: faker.person.fullName(),
            lastName: faker.person.lastName(),
            age: faker.number.int({ min: 18, max: 60 }),
          };
          usersList.push(user);
        }
        await this.userModel.insertMany(usersList);
        console.log("30,000 users inserted successfully.");
      }
   
  }
  
  


  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userModel.findOne({email: createUserDto.email})
    if(existUser) throw new BadRequestException("User already exists")
    const user = await this.userModel.create(createUserDto)
    return user
  }

  async findAll({take, page}:QueryParamsDto) {
    const limit = Math.min(take, 30)
    return this.userModel.find().populate({path: "expenses", select: "category"}).skip((page-1)* limit).limit(limit)
  }

  async findOne(id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("invalid id")
    const user = await this.userModel.findById(id).populate("expenses")
    if(!user) throw new BadRequestException("user Not found!")
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if(!isValidObjectId(id)) throw new BadRequestException("invalid id")
      const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true})
      if(!updatedUser) throw new BadRequestException("user Not found!")
      return updatedUser
  }

  async remove(id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("invalid id")
      const deletedUser = await this.userModel.findByIdAndDelete(id)
      if(!deletedUser) throw new BadRequestException("user Not found!")
      return deletedUser
  }

  async addExpense(userId, expenseId){
    const updateUser = await this.userModel.findByIdAndUpdate(userId, {$push: {expenses: expenseId}})
    return updateUser
  }

  async deleteExpense(userId, expenseId){
    const updateUser = await this.userModel.findByIdAndUpdate(userId, {$pull: {expenses: expenseId}})
  }


  async findAmount(){
    const count = await this.userModel.countDocuments()
    return count
  }

  async findByAge(age?: number, ageFrom?: number, ageTo?: number,) {
    const filter: any = {};
  
    if (age !== undefined) {
      filter.age = Number(age);
    } else if (ageFrom !== undefined && ageTo !== undefined) {
      filter.age = { $gte: Number(ageFrom), $lte: Number(ageTo) };
    }
  
    return this.userModel.find(filter);
  }
}
