import { zUserCreateInput, zUserDto } from '@repo/data';
import { initContract, type RouterOptions } from '@ts-rest/core';
import { z } from 'zod';
import { USERS_CONTRACT_PATH_PREFIX } from '../constants';

const c = initContract();

const routerOptions: RouterOptions<typeof USERS_CONTRACT_PATH_PREFIX> = {
  pathPrefix: USERS_CONTRACT_PATH_PREFIX,
  strictStatusCodes: true,
};

export const apiUsersContract = c.router(
  {
    getUsers: {
      method: 'GET',
      path: '/',
      responses: {
        200: z.array(zUserDto),
        400: z.null(),
      },
      summary: 'Get all users',
      metadata: { roles: ['guest', 'user'] } as const,
    },
    createUser: {
      method: 'POST',
      path: '/',
      body: zUserCreateInput,
      responses: {
        201: zUserDto,
        400: z.null(),
      },
      summary: 'Create a new user',
      metadata: { roles: ['guest', 'user'] } as const,
    },
  },
  routerOptions,
);
