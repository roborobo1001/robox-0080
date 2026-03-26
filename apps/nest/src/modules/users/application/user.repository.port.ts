import type { UserCreateInput } from '@repo/data';
import type { User } from '@/db/schemas';

export interface UserRepository {
  findAll: () => Promise<User[]>;
  create: (dto: UserCreateInput) => Promise<User>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

