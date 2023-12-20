import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseEntity } from './entities';
import { DatabaseRepositories } from './repositories';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const options = config.get('database');

        return {
          ...options,
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(DatabaseEntity),
  ],
  providers: [...DatabaseRepositories],
  exports: [TypeOrmModule, ...DatabaseRepositories],
})
export class StoreModule {}
