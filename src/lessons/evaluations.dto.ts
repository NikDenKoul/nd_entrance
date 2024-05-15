import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEvaluationDto {
  @ApiProperty({
    description: "Оценка, выставлямая пользователю по предмету",
    example: 56
  })
  @IsNotEmpty()
  score: number;

  @ApiProperty({
    description: "ID пользователя, которому выставляется оценка",
    example: 1
  })
  @IsNotEmpty()
  user_id: number;
}
