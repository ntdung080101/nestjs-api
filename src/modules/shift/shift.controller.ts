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
import { CreateShiftDto } from '../../dtos/create-shift.dto';
import { DeleteShiftDto } from '../../dtos/delete-shift.dto';
import { GetOneShiftDto } from '../../dtos/get-one-shift.dto';
import { ListAllShiftDto } from '../../dtos/list-all-shift.dto';
import { UpdateShiftDto } from '../../dtos/update-shift.dto';
import { Role } from '../../enums/role.enum';
import { RolesGuard } from '../../guard/roles.guard';
import { BaseResponseInterface } from '../../interfaces/common-interfaces/base.response.interface';
import { ShiftEntity } from '../store/entities/shift.entity';
import {
  CreateShiftCommand,
  DeleteShiftCommand,
  UpdateShiftCommand,
} from './commands/impl';
import { GetShiftQuery, ListAllShiftQuery } from './queries/impl';

@Controller('shift')
@ApiTags('Shift')
@ApiBearerAuth('jwt')
export class ShiftController {
  private readonly logger = new Logger(ShiftController.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('get')
  @ApiOperation({
    summary: 'get one shift',
  })
  async getOneShift(
    @Query() query: GetOneShiftDto,
  ): Promise<BaseResponseInterface<ShiftEntity>> {
    this.logger.verbose('.getOneShift', { query: query });

    const result = await this.queryBus.execute<
      GetShiftQuery,
      ShiftEntity | Error
    >(new GetShiftQuery(query.code));

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
    summary: 'list all shift',
  })
  async listAllShift(
    @Query() query: ListAllShiftDto,
  ): Promise<BaseResponseInterface<Array<ShiftEntity>>> {
    this.logger.verbose('.listAllShift', { query });

    const result = await this.queryBus.execute<
      ListAllShiftQuery,
      Array<ShiftEntity> | Error
    >(new ListAllShiftQuery());

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
  @ApiOperation({ summary: 'create new shift' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async createShift(
    @Body() query: CreateShiftDto,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('getStaffByCode', { query });

    const result = await this.commandBus.execute<
      CreateShiftCommand,
      boolean | Error
    >(
      new CreateShiftCommand(
        query.staffCode,
        query.name,
        query.salary,
        query.startTime,
        query.endTime,
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
  @ApiOperation({ summary: 'update shift information' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async updateShift(
    @Body() query: UpdateShiftDto,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('updateShift', { query });

    const result = await this.commandBus.execute<
      UpdateShiftCommand,
      boolean | Error
    >(
      new UpdateShiftCommand(
        query.code,
        query.staffCode,
        query.name,
        query.salary,
        query.startTime,
        query.endTime,
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
  @ApiOperation({ summary: 'Delete shift' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async deleteShift(
    @Body() query: DeleteShiftDto,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.deleteShift', { query });

    const result = await this.commandBus.execute<
      DeleteShiftCommand,
      boolean | Error
    >(new DeleteShiftCommand(query.code));

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
