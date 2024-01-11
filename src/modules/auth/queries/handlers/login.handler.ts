import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AccountRules } from '../../../../enums/role.enum';
import { checkHashing, hashing } from '../../../../utils/hashing';
import { CustomerEntity } from '../../../store/entities/customer.entity';
import { StaffEntity } from '../../../store/entities/staff.entity';
import {
  AccountRepository,
  CustomerRepository,
  StaffRepository,
} from '../../../store/repositories';
import { LoginQuery } from '../impl';

@QueryHandler(LoginQuery)
export class LoginHandler implements IQueryHandler<LoginQuery> {
  private readonly logger = new Logger(LoginHandler.name);
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly staffRepository: StaffRepository,
  ) {}

  async execute(
    query: LoginQuery,
  ): Promise<StaffEntity | CustomerEntity | Error> {
    try {
      this.logger.verbose('.execute', { query });

      const taiKhoan = await this.accountRepository.findOneAccount(
        query.username,
        query.role,
      );

      if (taiKhoan instanceof Error) {
        return taiKhoan;
      }

      const password = await hashing(query.password);

      const isPassword = await checkHashing(query.password, taiKhoan.mat_khau);

      if (!isPassword) {
        return new Error('wrong password');
      }

      if (query.role === AccountRules.CUSTOMER) {
        return this.customerRepository.findOneAccountByCode(taiKhoan.ma);
      } else {
        return this.staffRepository.findOneAccountByCode(taiKhoan.ma);
      }
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }
}
