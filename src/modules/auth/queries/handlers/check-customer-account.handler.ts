import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AccountRepository } from '../../../store/repositories';
import { CheckCustomerAccountQuery } from '../impl';

@QueryHandler(CheckCustomerAccountQuery)
export class CheckCustomerAccountHandler
  implements IQueryHandler<CheckCustomerAccountQuery>
{
  private readonly logger = new Logger(CheckCustomerAccountHandler.name);
  constructor(private readonly taiKhoanRepository: AccountRepository) {}

  async execute({
    gmail,
  }: CheckCustomerAccountQuery): Promise<boolean | Error> {
    try {
      this.logger.verbose('.execute', { gmail });

      return this.taiKhoanRepository.checkAccountExists(gmail);
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }
}
