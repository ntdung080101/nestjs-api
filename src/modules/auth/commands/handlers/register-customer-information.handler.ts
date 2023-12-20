import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CustomerEntity } from '../../../store/entities/customer.entity';
import { CustomerRepository } from '../../../store/repositories';
import { RegisterCustomerInformationCommand } from '../impl/register-customer-information.command';

@CommandHandler(RegisterCustomerInformationCommand)
export class RegisterCustomerInformationHandler
  implements ICommandHandler<RegisterCustomerInformationCommand>
{
  private readonly logger = new Logger(RegisterCustomerInformationHandler.name);
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(
    query: RegisterCustomerInformationCommand,
  ): Promise<CustomerEntity | Error> {
    try {
      this.logger.verbose('.execute', {
        query,
      });

      return this.customerRepository.createOneAccount(
        query.name,
        query.phoneNumber,
        query.accountCode,
        query.address,
      );
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }
}
