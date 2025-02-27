import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Mongoose } from "mongoose";

@Schema({timestamps: true})
export class User {
    
    @Prop({type: String})
    firstName: string

    @Prop({type: String})
    lastName: string

    @Prop({type: String})
    email: string

    @Prop({type: Number})
    age: number

    @Prop({type: [mongoose.Schema.Types.ObjectId], ref: "Expense", default: []})
    expenses: mongoose.Schema.Types.ObjectId[]
}

export const userSchema = SchemaFactory.createForClass(User)
