import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLessonDto {
  @ApiProperty({
    description: "Название урока",
    example: "Музыка"
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: "Код урока",
    example: "music"
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  code: string;
}
