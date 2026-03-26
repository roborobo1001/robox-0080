import { Logger } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import type { DrizzleModuleOptions } from './db.port';
import * as schema from './schemas';

export function createDrizzleClient(options: DrizzleModuleOptions) {
  const pool = new Pool({
    connectionString: options.connectionString,
  });

  new Logger('DrizzleClient').log('Connecting to database...');
  return drizzle({ client: pool, schema });
}
