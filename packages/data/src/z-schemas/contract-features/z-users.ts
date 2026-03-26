import { z } from 'zod';

export const zUserDto = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const zUserCreateInput = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(7),
});

export const zUserUpdateInput = z.object({
  email: z.string().email(),
  name: z.string().min(2).optional(),
  password: z.string().min(7).optional(),
});

export type UserDto = z.infer<typeof zUserDto>;
export type UserCreateInput = z.infer<typeof zUserCreateInput>;
export type UserUpdateInput = z.infer<typeof zUserUpdateInput>;
