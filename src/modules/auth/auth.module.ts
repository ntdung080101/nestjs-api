import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';

import { JWT_SECRET_KEY, JWT_TIMEOUT } from '../../constraint';
import { MailModule } from '../mail/mail.module';
import { StoreModule } from '../store/store.module';
import { AuthController } from './auth.controller';
import { AUTH_COMMAND_HANDLERS } from './commands/handlers';
import { AUTH_QUERY_HANDLERS } from './queries/handlers';

@Module({
  imports: [
    StoreModule,
    CqrsModule,
    MailModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: JWT_TIMEOUT },
    }),
  ],
  providers: [...AUTH_QUERY_HANDLERS, ...AUTH_COMMAND_HANDLERS],
  controllers: [AuthController],
})
export class AuthModule {}
