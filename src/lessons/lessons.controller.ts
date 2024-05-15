import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { CreateLessonDto } from "./lessons.dto";
import { CreateEvaluationDto } from "./evaluations.dto";
import { ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Evaluation } from "./evaluation.entity";
import { Lesson } from "./lesson.entity";

@ApiTags('Lessons & evaluations')
@Controller('api/lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiResponse({ status: 200, description: "Список уроков" })
  @Get()
  async findAll() {
    return await this.lessonsService.findAll();
  }

  @ApiResponse({ status: 201, description: "Урок успешно создан", type: Lesson })
  @ApiResponse({ status: 400, description: 'Ошибка в запросе: неверные данные.' })
  @Post()
  async createOne(@Body() userData: CreateLessonDto, @Res() response) {
    const [newLesson, error] = await this.lessonsService.createOne(userData);
    if (error) {
      response.status(400).send(error.message);
    } else {
      response.send(newLesson);
    }
  }

  @ApiParam({ name: 'id', description: 'ID урока, по которому выставляется оценка', example: 3 })
  @ApiResponse({ status: 201, description: "Оценка успешно создана", type: Evaluation })
  @ApiResponse({ status: 400, description: 'Ошибка в запросе: неверные данные.' })
  @Post(":id/evaluations")
  async createLesson(@Param('id') lessonId: number,
                     @Body() evaluationData: CreateEvaluationDto,
                     @Res() response) {
    const [newEvaluation, error] = await this.lessonsService.createEvaluation(lessonId, evaluationData.user_id, evaluationData.score);
    if (error) {
      response.status(400).send(error.message);
    } else {
      response.send(newEvaluation);
    }
  }
}
