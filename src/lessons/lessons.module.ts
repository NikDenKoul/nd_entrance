import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Lesson } from "./lesson.entity";
import { Evaluation } from "./evaluation.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Evaluation])],
  providers: [LessonsService],
  controllers: [LessonsController]
})
export class LessonsModule {}
