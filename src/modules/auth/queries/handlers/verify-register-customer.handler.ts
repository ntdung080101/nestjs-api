import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Cache } from 'cache-manager';

import { RegisterAccountCacheInterface } from '../../../../interfaces/common-interfaces/register-cache.interface';
import { formatRegisterCache } from '../../../../utils/format-cache-key';
import { VerifyRegisterCustomerQuery } from '../impl';

@QueryHandler(VerifyRegisterCustomerQuery)
export class VerifyRegisterCustomerHandler
  implements IQueryHandler<VerifyRegisterCustomerQuery>
{
  private readonly logger = new Logger(VerifyRegisterCustomerHandler.name);
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async execute({
    gmail,
    code,
  }: VerifyRegisterCustomerQuery): Promise<boolean> {
    try {
      this.logger.verbose('.execute', { gmail, code });

      const cacheKey = formatRegisterCache(gmail);
      const result = await this.cacheManager.get<RegisterAccountCacheInterface>(
        cacheKey,
      );

      if (result == undefined) {
        return false;
      }

      return result.code === code;
    } catch (e) {
      this.logger.error((e as Error).message);

      return false;
    }
  }
}
