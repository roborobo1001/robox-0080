import type { UserDto } from '@repo/data';
import { Exclude, Expose, plainToInstance, Transform } from 'class-transformer';
import type { User } from '@/db/schemas';

/**
 * User DTO for API responses. Implements the contract from @repo/data.
 */
@Exclude()
export class UserResponseDto implements UserDto {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  password!: string;

  @Expose()
  @Transform(({ value }: { value: Date }) =>
    value instanceof Date ? value.toISOString() : value,
  )
  createdAt!: string;

  @Expose()
  @Transform(({ value }: { value: Date }) =>
    value instanceof Date ? value.toISOString() : value,
  )
  updatedAt!: string;
}

export function transformUserDto(user: User): UserResponseDto {
  return plainToInstance(UserResponseDto, user);
}
