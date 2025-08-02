// src/config/typeorm.config.ts
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { EnvironmentVariablesDto } from './dto/config.dto';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService<EnvironmentVariablesDto>) => {
    return {
      type: 'postgres',
      host: configService.get<string>('TYPEORM_HOST'),
      port: configService.get<string>('TYPEORM_PORT'),
      database: configService.get<string>('TYPEORM_DATABASE'),
      username: configService.get<string>('TYPEORM_USERNAME'),
      password: configService.get<string>('TYPEORM_PASSWORD'),
      autoLoadEntities: true,
      // logging: true,
      entities: configService.get<string>('TYPEORM_ENTITIES')?.split(','),
      migrations: [configService.get<string>('TYPEORM_MIGRATIONS')],
      migrationsRun:
        configService.get<string>('TYPEORM_RUN_MIGRATIONS') === 'true',
      synchronize: configService.get<string>('TYPEORM_SYNCHRONIZE') === 'false',
    };
  },
} as TypeOrmModuleAsyncOptions;
