import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Expense {
  @Prop({type: String, required: true })
  title: string;

  @Prop({ required: true, type: Number })
  amount: number;

  @Prop({ required: true, type: String})
  category: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "user"})
  user: mongoose.Schema.Types.ObjectId
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
