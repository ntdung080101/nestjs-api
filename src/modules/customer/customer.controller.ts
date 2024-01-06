import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { GetCustomerDto } from '../../dtos/get-customer.dto';
import { RegisterCustomerInformationDto } from '../../dtos/register-customer-information.dto';
import { BaseResponseInterface } from '../../interfaces/common-interfaces/base.response.interface';
import { CustomerEntity } from '../store/entities/customer.entity';
import { GetCustomerQuery, ListCustomerQuery } from './queries/impl';

@Controller('customer')
@ApiTags('Customer')
export class CustomerController {
  private readonly logger = new Logger(CustomerController.name);

  constructor(private readonly queryBus: QueryBus) {}

  @Post('register-information')
  @ApiOperation({
    summary: 'register customer information',
    description: 'this method create customer information',
  })
  async registerInformation(
    @Body() request: RegisterCustomerInformationDto,
  ): Promise<BaseResponseInterface<unknown>> {
    this.logger.verbose('.registerInformation', { request });

    return {
      statusCode: 200,
      message: '',
      error: undefined,
    };
  }

  @Get('get')
  @ApiOperation({
    summary: 'get customer information',
    description: 'this method get customer information',
  })
  async getCustomer(
    @Query() request: GetCustomerDto,
  ): Promise<BaseResponseInterface<CustomerEntity>> {
    this.logger.verbose('.getCustomer', { request });

    const result = await this.queryBus.execute<
      GetCustomerQuery,
      CustomerEntity | Error
    >(new GetCustomerQuery(request.code));

    if (result instanceof Error) {
      return {
        statusCode: 400,
        error: (result as Error).message,
        message: [],
      };
    }

    return {
      statusCode: 200,
      message: result,
      error: undefined,
    };
  }

  @Get('list')
  @ApiOperation({
    summary: 'get customer information',
    description: 'this method get customer information',
  })
  async listCustomer(
    @Query() request: ListCustomerQuery,
  ): Promise<BaseResponseInterface<Array<CustomerEntity>>> {
    this.logger.verbose('.listCustomer', { request });

    const result = await this.queryBus.execute<
      ListCustomerQuery,
      Array<CustomerEntity> | Error
    >(new ListCustomerQuery());

    if (result instanceof Error) {
      return {
        statusCode: 400,
        error: (result as Error).message,
        message: [],
      };
    }

    return {
      statusCode: 200,
      message: result,
      error: undefined,
    };
  }
}
