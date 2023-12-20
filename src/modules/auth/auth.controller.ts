import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Inject,
  Logger,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';

import { TTL_CACHE_GEN_CODE } from '../../constraint';
import { AccountDto } from '../../dtos/account.dto';
import { LoginDto } from '../../dtos/login.dto';
import { RegisterCustomerInformationDto } from '../../dtos/register-customer-information.dto';
import { MailTitleEnum } from '../../enums/mail-title.enum';
import {
  AccountRules,
  LoginRules,
  StaffPermission,
  StaffRules,
} from '../../enums/role.enum';
import { BaseResponseInterface } from '../../interfaces/common-interfaces/base.response.interface';
import { RegisterAccountCacheInterface } from '../../interfaces/common-interfaces/register-cache.interface';
import { formatRegisterCache } from '../../utils/format-cache-key';
import { CreateAccountCommand } from '../account/commands/impl';
import { SendCodeMailCommand } from '../mail/commands/impl/send-code-mail.command';
import { AccountEntity } from '../store/entities';
import { CustomerEntity } from '../store/entities/customer.entity';
import { StaffEntity } from '../store/entities/staff.entity';
import { RegisterCustomerInformationCommand } from './commands/impl/register-customer-information.command';
import {
  CheckCustomerAccountQuery,
  LoginQuery,
  VerifyRegisterCustomerQuery,
} from './queries/impl';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post('/login-customer')
  async loginCustomer(
    @Body() request: LoginDto,
  ): Promise<BaseResponseInterface<string> | Error> {
    this.logger.verbose('.loginCustomer', { request });

    const khachHang = await this.queryBus.execute<
      LoginQuery,
      CustomerEntity | Error
    >(
      new LoginQuery(request.userName, request.password, AccountRules.CUSTOMER),
    );

    if (khachHang instanceof Error) {
      this.logger.error((khachHang as Error).message);
      throw new UnauthorizedException();
    }

    const payload = {
      ...khachHang,
      roleLogin: LoginRules.CUSTOMER,
    };

    console.log(JSON.stringify(payload, null, 2));

    return {
      statusCode: 200,
      message: await this.jwtService.signAsync(payload),
      error: undefined,
    };
  }
  @Post('/login-staff')
  async loginStaff(
    @Body() request: LoginDto,
  ): Promise<BaseResponseInterface<string> | Error> {
    this.logger.verbose('.loginStaff', { request });

    const taikhoan = await this.queryBus.execute<
      LoginQuery,
      StaffEntity | Error
    >(new LoginQuery(request.userName, request.password, AccountRules.STAFF));

    if (taikhoan instanceof Error) {
      this.logger.error((taikhoan as Error).message);
      throw new UnauthorizedException();
    }

    const payload = {
      ...taikhoan,
      roleLogin: LoginRules.STAFF,
    };

    if (
      taikhoan.chuc_vu === StaffRules.ADMIN &&
      taikhoan.phan_quyen === StaffPermission.ADMIN
    ) {
      payload.roleLogin = LoginRules.ADMIN;
    }

    if (
      taikhoan.chuc_vu === StaffRules.MANAGER &&
      taikhoan.phan_quyen === StaffPermission.STAFF
    ) {
      payload.roleLogin = LoginRules.MANAGER;
    }

    return {
      statusCode: 200,
      message: await this.jwtService.signAsync(payload),
      error: undefined,
    };
  }

  @Post('/initRegister-customer')
  async registerAccountCustomer(
    @Body() request: AccountDto,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.initRegisterAccountCustomer', { request });

    const isExists = await this.queryBus.execute<
      CheckCustomerAccountQuery,
      boolean | Error
    >(new CheckCustomerAccountQuery(request.gmail));

    if (isExists instanceof Error) {
      return {
        statusCode: 400,
        error: (isExists as Error).message,
        message: false,
      };
    }

    const mail = await this.commandBus.execute<
      SendCodeMailCommand,
      string | Error
    >(
      new SendCodeMailCommand(request.gmail, MailTitleEnum.VERIFY_REGISTER, ''),
    );

    if (mail instanceof Error) {
      return {
        statusCode: 400,
        error: (mail as Error).message,
        message: false,
      };
    }

    const cacheKey = formatRegisterCache(request.gmail);
    await this.cacheManager.set(
      cacheKey,
      { id: mail, password: request.password },
      TTL_CACHE_GEN_CODE,
    );

    return {
      statusCode: 200,
      message: true,
      error: undefined,
    };
  }

  @Post('/register-customer')
  async registerCustomer(
    @Body() request: RegisterCustomerInformationDto,
  ): Promise<BaseResponseInterface<string>> {
    this.logger.verbose('.registerCustomer', { request });

    const verify = await this.queryBus.execute<
      VerifyRegisterCustomerQuery,
      RegisterAccountCacheInterface | Error
    >(new VerifyRegisterCustomerQuery(request.gmail, request.code));

    if (verify instanceof Error) {
      return {
        statusCode: 400,
        message: [],
        error: (verify as Error).message,
      };
    }

    const cacheKey = formatRegisterCache(request.gmail);
    const cacheResult = await this.cacheManager.get<{
      id: string;
      password: string;
    }>(cacheKey);

    const account = await this.commandBus.execute<
      CreateAccountCommand,
      AccountEntity | Error
    >(
      new CreateAccountCommand(
        request.gmail,
        cacheResult?.password ?? '',
        AccountRules.CUSTOMER,
      ),
    );

    if (account instanceof Error) {
      return {
        statusCode: 400,
        error: (account as Error).message,
        message: [],
      };
    }

    const result = await this.commandBus.execute<
      RegisterCustomerInformationCommand,
      CustomerEntity | Error
    >(
      new RegisterCustomerInformationCommand(
        request.name,
        request.address,
        request.phoneNumber,
        account.ma,
      ),
    );

    if (result instanceof Error) {
      return {
        statusCode: 400,
        message: [],
        error: (result as Error).message,
      };
    }

    const payload = {
      ...result,
      roleLogin: LoginRules.CUSTOMER,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      statusCode: 200,
      message: token,
      error: undefined,
    };
  }
}
