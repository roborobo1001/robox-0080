import { z } from 'zod';

export const zUserDto = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
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
