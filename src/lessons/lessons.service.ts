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
    @InjectRepository(Evaluation)
    private evaluationsRepository: Repository<Evaluation>,
  ) {}

  async findAll(): Promise<Lesson[]> {
    return await this.lessonsRepository.find({
      select: {
        evaluations: {
          id: true,
          score: true,
          createdAt: true
        }
      },
      relations:  {
        evaluations: {
          user: true
        }
      }
    });
  }

  async createOne(lessonData: CreateLessonDto): Promise<[Lesson|null, Error|null]> {
    try {
      const newLesson = this.lessonsRepository.create(lessonData);
      await this.lessonsRepository.save([newLesson]);
      return [newLesson, null];
    } catch (error) {
      return [null, error];
    }
  }

  async createEvaluation(lessonId: number, userId: number, score: number): Promise<[Evaluation|null, Error|null]> {
    try {
      const newEvaluation = this.evaluationsRepository.create({ score: score, userId: userId, lessonId: lessonId });
      await this.evaluationsRepository.save([newEvaluation]);
      return [newEvaluation, null];
    } catch (error) {
      return [null, error];
    }
  }

  async deleteSome(lessonsIds): Promise<void> {
    await this.lessonsRepository.delete({ id: In(lessonsIds) });
  }
}
