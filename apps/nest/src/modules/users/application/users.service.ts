import { Inject, Injectable } from '@nestjs/common';
import type { UserCreateInput } from '@repo/data';
import type { User } from '@/db/schemas';

import {
  USER_REPOSITORY,
  type UserRepository,
} from './user.repository.port';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async create(createUserDto: UserCreateInput): Promise<User> {
    return this.userRepository.create(createUserDto);
  }
}

