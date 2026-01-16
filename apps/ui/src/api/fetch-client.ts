import { apiContract } from '@repo/contracts';
import { initClient } from '@ts-rest/core';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const apiClient = initClient(apiContract, {
  baseUrl: API_BASE_URL,
  baseHeaders: {
    'Content-Type': 'application/json',
  },
});
