import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MailerService } from '@nestjs-modules/mailer';

import { MAIL_ADDRESS } from '../../../../constraint';
import { makeShortId } from '../../../../utils/shortId';
import { SendCodeMailCommand } from '../impl/send-code-mail.command';

@CommandHandler(SendCodeMailCommand)
export class SendCodeMailHandler
  implements ICommandHandler<SendCodeMailCommand>
{
  private readonly logger = new Logger(SendCodeMailHandler.name);
  constructor(private readonly mailerService: MailerService) {}

  async execute({
    gmail,
    title,
    contain,
  }: SendCodeMailCommand): Promise<string | Error> {
    try {
      this.logger.verbose('.execute', { gmail, title, contain });

      const id = makeShortId(6);

      await this.mailerService.sendMail({
        to: gmail,
        from: MAIL_ADDRESS,
        subject: title,
        text: contain,
        html: `<b> your verify register : ${id} </b>`,
      });

      return id;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }
}
