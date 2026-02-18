import { apiContract } from '@repo/contracts';
import { initQueryClient } from '@ts-rest/react-query';

// Set VITE_API_URL in dev (e.g. http://localhost:3030) so the UI calls the API directly; CORS is enabled on the API.
const API_BASE_URL =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? 'http://localhost:3030' : '');

export const apiClient = initQueryClient(apiContract, {
  baseUrl: API_BASE_URL,
  baseHeaders: {
    'Content-Type': 'application/json',
  },
});
