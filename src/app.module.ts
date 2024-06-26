import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '../config/';
import { User } from "./users/user.entity";
import { UsersModule } from './users/users.module';
import { LessonsModule } from './lessons/lessons.module';
import { Lesson } from "./lessons/lesson.entity";
import { Evaluation } from "./lessons/evaluation.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseConfig,
      entities: [User, Lesson, Evaluation],
      synchronize: true,
    }),
    UsersModule,
    LessonsModule,
  ]
})
export class AppModule {}
