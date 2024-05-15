import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { CreateLessonDto } from "./lessons.dto";
import { CreateEvaluationDto } from "./evaluations.dto";

@Controller('api/lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  async findAll() {
    return await this.lessonsService.findAll();
  }

  @Post()
  async createOne(@Body() userData: CreateLessonDto, @Res() response) {
    const [newLesson, error] = await this.lessonsService.createOne(userData);
    if (error) {
      response.status(500).send(error.message);
    } else {
      response.send(newLesson);
    }
  }

  @Post(":id/evaluations")
  async createLesson(@Param('id') lessonId: number,
                     @Body() evaluationData: CreateEvaluationDto,
                     @Res() response) {
    const [newEvaluation, error] = await this.lessonsService.createEvaluation(lessonId, evaluationData.user_id, evaluationData.score);
    if (error) {
      response.status(500).send(error.message);
    } else {
      response.send(newEvaluation);
    }
  }
}
