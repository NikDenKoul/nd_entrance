import { Test, TestingModule } from '@nestjs/testing';
import { LessonsService } from './lessons.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseConfig } from '../../config/';
import { Lesson } from "./lesson.entity";
import { QueryFailedError } from "typeorm";
import { Evaluation } from "./evaluation.entity";
import { User } from "../users/user.entity";
import { UsersService } from "../users/users.service";

describe('LessonsService', () => {
  let service: LessonsService;
  let usersService: UsersService;
  let newLessonsIds: Array<number> = [];
  let testUserId: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          ...databaseConfig,
          entities: [Lesson, Evaluation, User],
          synchronize: false,
        }),
        TypeOrmModule.forFeature([Lesson, Evaluation, User])
      ],
      providers: [LessonsService, UsersService],
    }).compile();

    service = module.get<LessonsService>(LessonsService);
    usersService = module.get<UsersService>(UsersService);

    const [testUser] = await usersService.createOne({ name: "New test user", email: "testuser@example.com" });
    testUserId = testUser.id;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it("Should return array of lessons.", async () => {
      const lessons = await service.findAll();
      expect(Array.isArray(lessons)).toBe(true);
      if (!Array.isArray(lessons)) return;

      for (const lesson of lessons) {
        expect(lesson).toBeInstanceOf(Lesson);
      }
    });
  });

  describe('createOne', () => {
    it('should successfully create lesson, if passed data is valid', async () => {
      const lessonData = { name: "Lesson 1", code: "lesson_1" };

      const [newLesson, error] = await service.createOne(lessonData);
      expect(newLesson).toBeInstanceOf(Lesson);
      expect(error).toBe(null);

      if (newLesson) newLessonsIds.push(newLesson.id);
    });

    it('should fail, if name is NOT valid', async () => {
      const lessonData = { name: null, code: "lesson_2" };

      const [newLesson, error] = await service.createOne(lessonData);
      expect(newLesson).toBe(null);
      expect(error).toBeInstanceOf(QueryFailedError);

      if (newLesson) newLessonsIds.push(newLesson.id);
    });

    it('should fail, if code is NOT valid', async () => {
      const lessonData = { name: "Lesson 3", code: "lesson_01234567890123456789" };

      const [newLesson, error] = await service.createOne(lessonData);
      expect(newLesson).toBe(null);
      expect(error).toBeInstanceOf(QueryFailedError);

      if (newLesson) newLessonsIds.push(newLesson.id);
    });
  });

  describe("createEvaluation", () => {
    it('should successfully create evaluation, if passed data is valid', async () => {
      const [newLesson, _] = await service.createOne({ name: "New test lesson 1", code: "ntl-1" });
      if (!newLesson) return expect(newLesson).toBeInstanceOf(Lesson);
      newLessonsIds.push(newLesson.id);

      const lessonId = newLesson.id;
      const userId = testUserId;
      const score = 50;

      const [newEvaluation, error] = await service.createEvaluation(lessonId, userId, score);
      expect(newEvaluation).toBeInstanceOf(Evaluation);
      expect(error).toBe(null);
    });

    it('should fail, if lessonId is NOT valid', async () => {
      const lessonId = +"aaa";
      const userId = testUserId;
      const score = 50;

      const [newEvaluation, error] = await service.createEvaluation(lessonId, userId, score);
      expect(newEvaluation).toBe(null);
      expect(error).toBeInstanceOf(QueryFailedError);
    });

    it('should fail, if userId is NOT valid', async () => {
      const [newLesson, _] = await service.createOne({ name: "New test lesson 2", code: "ntl-2" });
      if (!newLesson) return expect(newLesson).toBeInstanceOf(Lesson);
      newLessonsIds.push(newLesson.id);

      const lessonId = newLesson.id;
      const userId = +"aaa";
      const score = 50;

      const [newEvaluation, error] = await service.createEvaluation(lessonId, userId, score);
      expect(newEvaluation).toBe(null);
      expect(error).toBeInstanceOf(QueryFailedError);
    });

    it('should fail, if score is NOT valid', async () => {
      const [newLesson, _] = await service.createOne({ name: "New test lesson 3", code: "ntl-3" });
      if (!newLesson) return expect(newLesson).toBeInstanceOf(Lesson);
      newLessonsIds.push(newLesson.id);

      const lessonId = newLesson.id;
      const userId = testUserId;
      const score = +"aaa";

      const [newEvaluation, error] = await service.createEvaluation(lessonId, userId, score);
      expect(newEvaluation).toBe(null);
      expect(error).toBeInstanceOf(QueryFailedError);
    });
  });

  afterEach(async () => {
    await usersService.deleteSome([testUserId]);
  });

  afterAll(async () => {
    await service.deleteSome(newLessonsIds);
  });
});
