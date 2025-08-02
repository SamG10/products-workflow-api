import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import * as BASE_CONFIG from '../default-config';

export class EnvironmentVariablesDto {
  @IsString()
  NODE_ENV = BASE_CONFIG.DEFAULT_NODE_ENV;

  @IsNumber()
  @Type(() => Number)
  PORT = BASE_CONFIG.DEFAULT_PORT;

  @IsString()
  @IsNotEmpty()
  TYPEORM_CONNECTION: string;

  @IsString()
  @IsNotEmpty()
  TYPEORM_DATABASE: string;

  @IsString()
  @IsNotEmpty()
  TYPEORM_ENTITIES: string;

  @IsString()
  @IsNotEmpty()
  TYPEORM_HOST: string;

  @IsString()
  @IsNotEmpty()
  TYPEORM_MIGRATIONS_TABLE_NAME: string;

  @IsString()
  @IsNotEmpty()
  TYPEORM_MIGRATIONS: string;

  @IsString()
  @IsNotEmpty()
  TYPEORM_PASSWORD: string;

  @IsNumber()
  @Type(() => Number)
  TYPEORM_PORT: number;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  TYPEORM_RUN_MIGRATIONS = BASE_CONFIG.TYPEORM_RUN_MIGRATIONS;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  TYPEORM_SYNCHRONIZE = BASE_CONFIG.TYPEORM_SYNCHRONIZE;

  @IsString()
  @IsNotEmpty()
  TYPEORM_USERNAME: string;
}
