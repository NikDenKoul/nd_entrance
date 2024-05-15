import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: "Имя пользователя",
    example: "Джонни"
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: "Электронная почта пользователя",
    example: "silverhand@cyber.punk"
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(30)
  email: string;
}
