import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Roles } from '../../decorator/roles.decorator';
import { CreateStaffDto } from '../../dtos/create-staff.dto';
import { DeleteStaffByCodeDto } from '../../dtos/delete-staff-by-code.dto';
import { GetStaffDto } from '../../dtos/get-staff.dto';
import { ListAllStaffDto } from '../../dtos/list-all-staff.dto';
import { UpdateStaffDto } from '../../dtos/update-staff.dto';
import { AccountRules, Role } from '../../enums/role.enum';
import { RolesGuard } from '../../guard/roles.guard';
import { BaseResponseInterface } from '../../interfaces/common-interfaces/base.response.interface';
import { CreateAccountCommand } from '../account/commands/impl';
import { AccountEntity } from '../store/entities';
import { StaffEntity } from '../store/entities/staff.entity';
import {
  CreateStaffCommand,
  DeleteStaffByCodeCommand,
  UpdateStaffCommand,
} from './commands/impl';
import { GetStaffByCodeQuery, ListAllStaffQuery } from './queries/impl';

@Controller('staff')
@ApiTags('Staff')
@ApiBearerAuth('jwt')
export class StaffController {
  private readonly logger = new Logger(StaffController.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('get')
  @ApiOperation({
    summary: 'get one staff',
  })
  async getOneStaff(
    @Query() query: GetStaffDto,
  ): Promise<BaseResponseInterface<StaffEntity>> {
    this.logger.verbose('.getOneStaff', { query: query });

    const result = await this.queryBus.execute<
      GetStaffByCodeQuery,
      StaffEntity | Error
    >(new GetStaffByCodeQuery(query.code));

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

  @Get('/list-all')
  @ApiOperation({
    summary: 'list all staff',
  })
  async listAllStaff(
    @Query() query: ListAllStaffDto,
  ): Promise<BaseResponseInterface<Array<StaffEntity>>> {
    this.logger.verbose('.listAllStaff', { query });

    const result = await this.queryBus.execute<
      ListAllStaffQuery,
      Array<StaffEntity> | Error
    >(new ListAllStaffQuery());

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

  @Post('create')
  @ApiOperation({ summary: 'create new staff' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async createStaff(
    @Body() query: CreateStaffDto,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('getStaffByCode', { query });

    const accountResult = await this.commandBus.execute<
      CreateAccountCommand,
      AccountEntity | Error
    >(
      new CreateAccountCommand(
        query.username,
        query.password,
        AccountRules.STAFF,
      ),
    );

    if (accountResult instanceof Error) {
      return {
        statusCode: 400,
        error: (accountResult as Error).message,
        message: [],
      };
    }

    const result = await this.commandBus.execute<
      CreateStaffCommand,
      boolean | Error
    >(
      new CreateStaffCommand(
        query.name,
        query.address,
        query.gender,
        query.phoneNumber,
        query.role,
        accountResult.ma,
      ),
    );

    if (result instanceof Error) {
      return {
        statusCode: 400,
        error: (result as Error).message,
        message: [],
      };
    }

    return {
      statusCode: 201,
      message: result,
      error: undefined,
    };
  }

  @Put('update')
  @ApiOperation({ summary: 'update staff information' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async updateStaff(
    @Body() query: UpdateStaffDto,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('updateStaff', { query });

    const result = await this.commandBus.execute<
      UpdateStaffCommand,
      boolean | Error
    >(
      new UpdateStaffCommand(
        query.code,
        query.name,
        query.address,
        query.phoneNumber,
        query.gender,
        query.permission,
      ),
    );

    if (result instanceof Error) {
      return {
        statusCode: 400,
        error: (result as Error).message,
        message: [],
      };
    }

    return {
      statusCode: 200,
      message: true,
      error: undefined,
    };
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Delete staff' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async deleteStaff(
    @Body() query: DeleteStaffByCodeDto,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.deleteStaff', { query });

    const result = await this.commandBus.execute<
      DeleteStaffByCodeCommand,
      boolean | Error
    >(new DeleteStaffByCodeCommand(query.code));

    if (result instanceof Error) {
      return {
        statusCode: 400,
        error: (result as Error).message,
        message: [],
      };
    }

    return {
      statusCode: 200,
      message: true,
      error: undefined,
    };
  }
}
