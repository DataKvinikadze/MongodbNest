import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseSchema } from './schema/expense.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: "expense", schema: ExpenseSchema}])],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
