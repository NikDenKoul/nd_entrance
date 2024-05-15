import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./users.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./user.entity";

@ApiTags('Users')
@Controller('api/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ status: 200, description: "Список пользователей" })
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @ApiResponse({ status: 201, description: "Пользователь успешно создан", type: User })
  @ApiResponse({ status: 400, description: 'Ошибка в запросе: неверные данные.' })
  @Post()
  async createOne(@Body() userData: CreateUserDto, @Res() response) {
    const [newUser, error] = await this.usersService.createOne(userData);
    if (error) {
      response.status(400).send(error.message);
    } else {
      response.send(newUser);
    }
  }
}
