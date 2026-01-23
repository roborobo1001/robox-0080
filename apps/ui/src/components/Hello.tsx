import { apiClient } from '../api/fetch-client';

export function Hello() {
  const { data, isLoading, error } = apiClient.hello.getHello.useQuery([
    'hello',
  ]);

  if (isLoading) {
    return (
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <p className="text-red-700 dark:text-red-400 font-medium">Error:</p>
        <p className="mt-1 text-red-600 dark:text-red-500">
          {error.status
            ? `Status ${error.status}: ${typeof error.body === 'object' && error.body && 'message' in error.body ? String(error.body.message) : 'Failed to fetch'}`
            : 'Failed to fetch message'}
        </p>
      </div>
    );
  }

  if (data?.status === 200) {
    return (
      <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <p className="text-lg font-medium text-green-900 dark:text-green-100">
          Message from API:
        </p>
        <p className="mt-2 text-green-700 dark:text-green-400">
          {data.body.message}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
      <p className="text-yellow-700 dark:text-yellow-400">No data received</p>
    </div>
  );
}
