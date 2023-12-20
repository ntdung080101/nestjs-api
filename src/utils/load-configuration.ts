import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { merge, set } from 'lodash';
import { resolve } from 'path';

function loadFromEnv(
  env: Record<string, string | undefined>,
  { delimiter = '__' } = {},
): Record<string, string> {
  return Object.entries(process.env).reduce((acc, [key, value]) => {
    set(acc, key.toLowerCase().replace(delimiter, '.'), value);
    return acc;
  }, {});
}

function loadFromYaml(env = 'development'): Record<string, unknown> {
  const configFile = `env.${env}.yaml`;
  const configPath = resolve(process.cwd(), configFile);

  Logger.log(`loading configuration from: ${configPath}`, 'ConfigService');

  return yaml.load(readFileSync(configPath, 'utf8')) as Record<string, unknown>;
}

export function loadConfiguration(): Record<string, unknown> {
  const fromYaml = loadFromYaml(process.env.NODE_ENV);
  const fromProcess = loadFromEnv(process.env);

  return merge(fromYaml, fromProcess);
}

export const CONFIG_INSTANCE = new ConfigService(loadConfiguration());
