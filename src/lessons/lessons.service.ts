import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Lesson } from "./lesson.entity";
import { Evaluation } from "./evaluation.entity";
import { CreateLessonDto } from "./lessons.dto";

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>,
  ) {}

  async findAll(): Promise<[]> {
    return [];
  }

  async createOne(lessonData: CreateLessonDto): Promise<[Lesson|null, Error|null]> {
    return [null, null]
  }

  async createEvaluation(lessonId: number, userId: number, score: number): Promise<[Evaluation|null, Error|null]> {
    return [null, null];
  }

  async deleteSome(lessonsIds): Promise<void> {
    await this.lessonsRepository.delete({ id: In(lessonsIds) });
  }
}
