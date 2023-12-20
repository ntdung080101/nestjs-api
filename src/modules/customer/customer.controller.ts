import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { RegisterCustomerInformationDto } from '../../dtos/register-customer-information.dto';
import { BaseResponseInterface } from '../../interfaces/common-interfaces/base.response.interface';

@Controller('customer')
@ApiTags('Customer')
export class CustomerController {
  private readonly logger = new Logger(CustomerController.name);
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
}
