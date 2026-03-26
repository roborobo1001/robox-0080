import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from './application/user.repository.port';
import { UsersService } from './application/users.service';
import { UserRepositoryImpl } from './infrastructure/user.repository';
import { UsersController } from './presentation/users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: USER_REPOSITORY, useClass: UserRepositoryImpl },
  ],
})
export class UsersModule {}
