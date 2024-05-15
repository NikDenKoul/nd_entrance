import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateLessonDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  code: string;
}
