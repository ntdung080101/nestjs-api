import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MailerModule } from '@nestjs-modules/mailer';

import { MAILER_COMMAND_HANDLERS } from './commands/handlers';
import { MailController } from './mail.controller';

@Module({
  imports: [
    CqrsModule,
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const options = config.getOrThrow('mailer');

        return {
          transport: {
            host: options.host,
            secure: false, // true for 465, false for other ports
            auth: options.auth,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: MAILER_COMMAND_HANDLERS,
  controllers: [MailController],
  exports: [MailerModule],
})
export class MailModule {}
