import { apiContract } from '@repo/contracts';
import { initClient } from '@ts-rest/core';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';

export const apiClient = initClient(apiContract, {
  baseUrl: API_BASE_URL,
  baseHeaders: {
    'Content-Type': 'application/json',
  },
});
