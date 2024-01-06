import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AccountRules } from '../../../enums/role.enum';
import { AccountEntity } from '../entities';

@Injectable()
export class AccountRepository {
  private logger = new Logger(AccountRepository.name);
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async createAccount(
    gmail: string,
    password: string,
    role: AccountRules,
  ): Promise<AccountEntity | Error> {
    try {
      this.logger.verbose('.createAccount', { gmail, password, role });

      const insertResult = await this.accountRepository.insert({
        ten_dang_nhap: gmail,
        mat_khau: password,
        role,
      });

      const account = await this.accountRepository.findOne({
        where: { ma: insertResult.raw.insertId },
      });

      return account as AccountEntity;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async deleteAccount(code: number): Promise<boolean | Error> {
    try {
      this.logger.verbose('.deleteAccount', { code });

      await this.accountRepository.delete({
        ma: code,
      });

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async findOneAccount(
    username: string,
    role: AccountRules,
  ): Promise<AccountEntity | Error> {
    try {
      this.logger.verbose('.findOneAccount', { username });

      const result = await this.accountRepository.findOne({
        where: { ten_dang_nhap: username, role },
      });

      if (result === null) {
        return new Error('Not found');
      }

      return result;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async checkAccountExists(username: string): Promise<boolean | Error> {
    try {
      this.logger.verbose('.checkAccountExists', { username });

      const result = await this.accountRepository.findOne({
        where: { ten_dang_nhap: username },
      });

      return result !== null;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }
}
