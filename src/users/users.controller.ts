import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./users.dto";

@Controller('api/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Post()
  async createOne(@Body() userData: CreateUserDto, @Res() response) {
    const [newUser, error] = await this.usersService.createOne(userData);
    if (error) {
      response.status(500).send(error.message);
    } else {
      response.send(newUser);
    }
  }
}
