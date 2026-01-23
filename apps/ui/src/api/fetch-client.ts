import { apiContract } from '@repo/contracts';
import { initQueryClient } from '@ts-rest/react-query';

// Contract already includes /api prefix, so baseUrl should be empty or just /
// Vite proxy will forward /api/* to http://localhost:3030/api/*
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const apiClient = initQueryClient(apiContract, {
  baseUrl: API_BASE_URL,
  baseHeaders: {
    'Content-Type': 'application/json',
  },
});
