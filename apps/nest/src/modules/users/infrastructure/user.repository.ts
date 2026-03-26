import { Inject, Injectable } from '@nestjs/common';
import type { UserCreateInput } from '@repo/data';
import type { DrizzleDb } from '@/db/db.port';
import { DB_TOKEN } from '@/db/db.port';
import type { User } from '@/db/schemas';
import { usersTable } from '@/db/schemas';
import type { UserRepository } from '../application/user.repository.port';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@Inject(DB_TOKEN) private readonly db: DrizzleDb) {}

  async findAll(): Promise<User[]> {
    return this.db.select().from(usersTable);
  }

  async create(dto: UserCreateInput): Promise<User> {
    const [user] = await this.db
      .insert(usersTable)
      .values({
        name: dto.name,
        email: dto.email,
        // TODO: add password to UserCreateInput and hash before insert
        password: '',
      })
      .returning();
    if (!user) throw new Error('Insert failed');
    return user;
  }
}

