import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ExpensesModule } from './expenses/expenses.module';

import * as dotenv from 'dotenv';
dotenv.config();  //ragac mierorebda dotenvis faili 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', 
    }),
    MongooseModule.forRoot(process.env.MONGO_URL || ""), 
    UsersModule,
    ExpensesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
