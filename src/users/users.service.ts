import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./users.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createOne(userData: CreateUserDto): Promise<[User|null, Error|null]> {
    try {
      const newUser = this.usersRepository.create(userData);
      await this.usersRepository.save([newUser]);
      return [newUser, null];
    } catch (error) {
      return [null, error];
    }
  }

  async deleteSome(ids: Array<number>) {
    await this.usersRepository.delete({ id: In(ids) });
  }
}
