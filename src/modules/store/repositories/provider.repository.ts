import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProviderEntity } from '../entities/provider.entity';

@Injectable()
export class ProviderRepository {
  private logger = new Logger(ProviderRepository.name);
  constructor(
    @InjectRepository(ProviderEntity)
    private readonly providerRepository: Repository<ProviderEntity>,
  ) {}

  async listAllProvider(): Promise<Array<ProviderEntity> | Error> {
    try {
      this.logger.verbose('.listAllProvider');

      return this.providerRepository.find({});
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async getProviderByCode(code: number): Promise<ProviderEntity | Error> {
    try {
      this.logger.verbose('.getProviderByCode', { code });

      const result = await this.providerRepository.findOne({
        where: { ma: code },
      });

      if (result === null) {
        return new Error('provider not found');
      }

      return result;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async createProvider(
    name: string,
    address: string,
    phoneNumber: string,
  ): Promise<boolean | Error> {
    try {
      this.logger.verbose('.createProvider', { name, address, phoneNumber });

      const result = await this.providerRepository.insert({
        dia_chi: address,
        ten: name,
        so_dien_thoai: phoneNumber,
      });

      this.logger.debug(JSON.stringify(result, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async updateProvider(
    code: number,
    name: string,
    address: string,
    phoneNumber: string,
  ): Promise<boolean | Error> {
    try {
      this.logger.verbose('.updateProvider', {
        code,
        name,
        address,
        phoneNumber,
      });

      const result = await this.providerRepository.update(
        { ma: code },
        {
          dia_chi: address,
          ten: name,
          so_dien_thoai: phoneNumber,
        },
      );

      this.logger.debug(JSON.stringify(result, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async deleteProvider(code: number): Promise<boolean | Error> {
    try {
      this.logger.verbose('.deleteProvider', {
        code,
      });

      const result = await this.providerRepository.delete({ ma: code });

      this.logger.debug(JSON.stringify(result, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }
}
