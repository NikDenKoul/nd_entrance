import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { databaseConfig } from '../../config/';
import { QueryFailedError } from "typeorm";

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  const newUsersIds: Array<number> = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          ...databaseConfig,
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User])
      ],
      controllers: [UsersController],
      providers: [UsersService]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it("Should return array of users.", async () => {
      const actual = await controller.findAll();
      expect(Array.isArray(actual)).toBe(true);
      if (!Array.isArray(actual)) return;
      for (const user of actual) {
        expect(user).toBeInstanceOf(User);
      }
    });
  });

  describe('createOne', () => {
    it('should successfully create user, if passed data is valid', async () => {
      const userData = { name: 'Test 1', email: 'test@test.com' };

      const [newUser, error] = await service.createOne(userData);
      expect(newUser).toBeInstanceOf(User);
      expect(error).toBe(null);

      if (newUser) newUsersIds.push(newUser.id);
    });

    it('should fail, if name is NOT valid', async () => {
      const userData: any = { email: 'test_2@test.com' };

      const [newUser, error] = await service.createOne(userData);
      expect(newUser).toBe(null);
      expect(error).toBeInstanceOf(QueryFailedError);

      if (newUser) newUsersIds.push(newUser.id);
    });

    it('should fail, if email is NOT valid', async () => {
      const userData: any = { name: 'Test 3' };

      const [newUser, error] = await service.createOne(userData);
      expect(newUser).toBe(null);
      expect(error).toBeInstanceOf(QueryFailedError);

      if (newUser) newUsersIds.push(newUser.id);
    });
  });

  afterAll(async () => {
    await service.deleteSome(newUsersIds);
  });
});
