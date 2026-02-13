import { apiClient } from '../api/fetch-client';

export function Hello() {
  const { data, isLoading, error } = apiClient.hello.getHello.useQuery([
    'hello',
  ]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.status || 'Failed to fetch'}</p>;
  if (data?.status === 200) return <p>{data.body.message}</p>;
  return <p>No data received</p>;
}
