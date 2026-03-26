import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type * as schema from './schemas';

// Dependency Injection Token for the Drizzle client
export const DB_TOKEN = Symbol('DB_TOKEN');

export type DrizzleDb = NodePgDatabase<typeof schema>;
export type Schema = typeof schema;
export interface DrizzlePoolOptions {
  max?: number;
  min?: number;
  idleTimeoutMillis?: number;
  connectionTimeoutMillis?: number;
}
export interface DrizzleModuleOptions {
  connectionString: string;
  pool?: DrizzlePoolOptions;
}
