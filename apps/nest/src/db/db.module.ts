import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DB_TOKEN } from './db.port';
import { createDrizzleClient } from './db.provider';

@Global()
@Module({
  providers: [
    {
      provide: DB_TOKEN,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return createDrizzleClient({
          connectionString: configService.getOrThrow<string>('DATABASE_URL'),
        });
      },
    },
  ],
  exports: [DB_TOKEN],
})
export class DrizzleModule {}
