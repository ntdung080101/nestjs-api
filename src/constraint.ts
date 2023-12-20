import { CONFIG_INSTANCE } from './utils/load-configuration';

export const JWT_SECRET_KEY = CONFIG_INSTANCE.getOrThrow('jwt.privateKey');
export const JWT_TIMEOUT = CONFIG_INSTANCE.getOrThrow('jwt.timeout', '60s');

export const CURRENT_TIMESTAMP = 'CURRENT_TIMESTAMP';

export const MAIL_ADDRESS = CONFIG_INSTANCE.getOrThrow('mailer.auth.user');

export const TTL_CACHE_GEN_CODE = 600000; // 1000 * 60 * 10
