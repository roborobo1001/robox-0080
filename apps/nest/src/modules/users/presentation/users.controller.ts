import { Controller } from '@nestjs/common';
import { apiContract } from '@repo/contracts';
import type { UserCreateInput } from '@repo/data';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { UsersService } from '../application/users.service';
import { transformUserDto } from './user-response.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @TsRestHandler(apiContract.users)
  async handler() {
    return tsRestHandler(apiContract.users, {
      getUsers: async () => {
        const users = await this.usersService.findAll();
        return { status: 200, body: users.map(transformUserDto) };
      },
      createUser: async ({ body }: { body: UserCreateInput }) => {
        const user = await this.usersService.create(body);
        return { status: 201, body: transformUserDto(user) };
      },
    });
  }
}

