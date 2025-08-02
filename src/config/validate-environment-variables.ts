import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { EnvironmentVariablesDto } from './dto/config.dto';

export function validate(
  config: Record<string, unknown>,
): EnvironmentVariablesDto {
  const validatedConfig = plainToClass(EnvironmentVariablesDto, config);

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
