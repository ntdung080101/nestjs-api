import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Logger,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Roles } from '../../decorator/roles.decorator';
import { CreateRateDto } from '../../dtos/create-rate.dto';
import { DeleteRateDto } from '../../dtos/delete-rate.dto';
import { GetOneRateDto } from '../../dtos/get-one-rate.dto';
import { ListAllRateDto } from '../../dtos/list-all-rate.dto';
import { UpdateRateDto } from '../../dtos/update-rate.dto';
import { Role } from '../../enums/role.enum';
import { RolesGuard } from '../../guard/roles.guard';
import { BaseResponseInterface } from '../../interfaces/common-interfaces/base.response.interface';
import { RateEntity } from '../store/entities/rate.entity';
import {
  CreateRateCommand,
  DeleteRateCommand,
  UpdateRateCommand,
} from './commands/impl';
import { GetOneRateQuery, ListAllRateQuery } from './queries/impl';

@Controller('rate')
@ApiTags('Rate')
@ApiBearerAuth('jwt')
export class RateController {
  private readonly logger = new Logger(RateController.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list-all')
  @ApiOperation({ summary: 'list all rate of product' })
  async listAllRate(
    @Query() query: ListAllRateDto,
  ): Promise<BaseResponseInterface<Array<RateEntity>>> {
    this.logger.verbose('.listAllRate', { query });

    const result = await this.queryBus.execute<
      ListAllRateQuery,
      Array<RateEntity> | Error
    >(new ListAllRateQuery(query.productCode));

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

  @Get('get')
  @ApiOperation({ summary: 'get one rate of product' })
  async getOneRateByCode(
    @Query() query: GetOneRateDto,
  ): Promise<BaseResponseInterface<RateEntity>> {
    this.logger.verbose('.getOneRateByCode', { query });

    const result = await this.queryBus.execute<
      GetOneRateQuery,
      RateEntity | Error
    >(new GetOneRateQuery(query.code));

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
  @ApiOperation({ summary: 'create one rate' })
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF, Role.CUSTOMER)
  @UseGuards(RolesGuard)
  async createRate(
    @Body() query: CreateRateDto,
    @Headers() headers: Record<string, never>,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.createRate', { query });

    const userId = headers['info']['ma_tai_khoan'];

    const result = await this.commandBus.execute<
      CreateRateCommand,
      boolean | Error
    >(new CreateRateCommand(query.score, userId, query.productCode));

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
  @ApiOperation({ summary: 'update one rate' })
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF, Role.CUSTOMER)
  @UseGuards(RolesGuard)
  async updateOneRate(
    @Body() query: UpdateRateDto,
    @Headers() headers: Record<string, never>,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.updateOneRate', { query });

    const userId = headers['info']['ma_tai_khoan'];

    const result = await this.commandBus.execute<
      UpdateRateCommand,
      boolean | Error
    >(new UpdateRateCommand(query.code, query.score, userId));

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

  @Delete('delete')
  @ApiOperation({ summary: 'delete one rate' })
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF, Role.CUSTOMER)
  @UseGuards(RolesGuard)
  async deleteOneRate(
    @Query() query: DeleteRateDto,
    @Headers() headers: Record<string, never>,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.deleteOneRate', { query });

    const userId = headers['info']['ma_tai_khoan'];

    const result = await this.commandBus.execute<
      DeleteRateCommand,
      boolean | Error
    >(new DeleteRateCommand(query.code, userId));

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
