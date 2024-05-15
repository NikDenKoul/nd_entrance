import { IsNotEmpty } from "class-validator";

export class CreateEvaluationDto {
  @IsNotEmpty()
  score: number;

  @IsNotEmpty()
  user_id: number;
}
