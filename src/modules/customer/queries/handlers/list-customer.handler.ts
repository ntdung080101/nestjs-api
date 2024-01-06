import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CustomerEntity } from '../../../store/entities/customer.entity';
import { CustomerRepository } from '../../../store/repositories';
import { ListCustomerQuery } from '../impl';

@QueryHandler(ListCustomerQuery)
export class ListCustomerHandler implements IQueryHandler<ListCustomerQuery> {
  private readonly logger = new Logger(ListCustomerHandler.name);

  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(
    query: ListCustomerQuery,
  ): Promise<Array<CustomerEntity> | Error> {
    this.logger.verbose('.execute', { query });

    return this.customerRepository.listCustomer();
  }
}
