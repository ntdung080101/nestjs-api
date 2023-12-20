import { Controller, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { BaseResponseInterface } from '../../interfaces/common-interfaces/base.response.interface';

@Controller('mail')
export class MailController {
  private readonly logger = new Logger(MailController.name);

  constructor(private readonly commandBus: CommandBus) {}

  async sendCodeVerifyRegister(): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.sendCodeVerifyRegister');

    return {
      error: undefined,
      message: true,
      statusCode: 200,
    };
  }
}
