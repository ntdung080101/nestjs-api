import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CustomerEntity } from '../../../store/entities/customer.entity';
import { CustomerRepository } from '../../../store/repositories';
import { GetCustomerQuery } from '../impl';

@QueryHandler(GetCustomerQuery)
export class GetCustomerHandler implements IQueryHandler<GetCustomerQuery> {
  private readonly logger = new Logger(GetCustomerHandler.name);

  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(query: GetCustomerQuery): Promise<CustomerEntity | Error> {
    this.logger.verbose('.execute', { query });

    return this.customerRepository.getCustomer(query.code);
  }
}
