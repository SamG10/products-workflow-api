import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { EnvironmentVariablesDto } from './dto/config.dto';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService<EnvironmentVariablesDto>) => {
    const config = {
      type: 'postgres',
      host: configService.get<string>('TYPEORM_HOST'),
      port: Number(configService.get('TYPEORM_PORT')),
      username: configService.get<string>('TYPEORM_USERNAME'),
      password: configService.get<string>('TYPEORM_PASSWORD'),
      database: configService.get<string>('TYPEORM_DATABASE'),
      logging: configService.get<string>('TYPEORM_LOGGING') === 'true',
      autoLoadEntities: true,
      entities: configService.get<string>('TYPEORM_ENTITIES')?.split(','),
      migrations: [
        configService.get<string>('TYPEORM_MIGRATIONS') ||
          'dist/migrations/*.js',
      ],
      migrationsRun:
        configService.get<string>('TYPEORM_RUN_MIGRATIONS') === 'true',
      synchronize: configService.get<string>('TYPEORM_SYNCHRONIZE') === 'true',
    };
    return config;
  },
} as TypeOrmModuleAsyncOptions;
