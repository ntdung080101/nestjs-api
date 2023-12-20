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
import { CreateProviderDto } from '../../dtos/create-provider.dto';
import { DeleteProviderDto } from '../../dtos/delete-provider.dto';
import { GetOneProviderDto } from '../../dtos/get-one-provider.dto';
import { ListAllProviderDto } from '../../dtos/list-all-provider.dto';
import { UpdateProviderDto } from '../../dtos/update-provider.dto';
import { Role } from '../../enums/role.enum';
import { RolesGuard } from '../../guard/roles.guard';
import { BaseResponseInterface } from '../../interfaces/common-interfaces/base.response.interface';
import { ProviderEntity } from '../store/entities/provider.entity';
import {
  CreateProviderCommand,
  DeleteProviderCommand,
  UpdateProviderCommand,
} from './commands/impl';
import { GetOneProviderQuery, ListAllProviderQuery } from './queries/impl';

@Controller('provider')
@ApiTags('Provider')
@ApiBearerAuth('jwt')
export class ProviderController {
  private readonly logger = new Logger(ProviderController.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list-all')
  @ApiOperation({ summary: 'list all provider' })
  async listAllProvider(
    @Query() query: ListAllProviderDto,
  ): Promise<BaseResponseInterface<Array<ProviderEntity>>> {
    this.logger.verbose('.listAllProvider', { query });

    const result = await this.queryBus.execute<
      ListAllProviderQuery,
      Array<ProviderEntity> | Error
    >(new ListAllProviderQuery());

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
  @ApiOperation({ summary: 'get one provider' })
  async getOneProviderByCode(
    @Query() query: GetOneProviderDto,
  ): Promise<BaseResponseInterface<ProviderEntity>> {
    this.logger.verbose('getOneProviderByCode', { query });

    const result = await this.queryBus.execute<
      GetOneProviderQuery,
      ProviderEntity | Error
    >(new GetOneProviderQuery(query.code));

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
  @ApiOperation({ summary: 'create one provider' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async createProvider(
    @Body() query: CreateProviderDto,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.createProvider', { query });

    const result = await this.commandBus.execute<
      CreateProviderCommand,
      boolean | Error
    >(new CreateProviderCommand(query.name, query.address, query.phoneNumber));

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
  @ApiOperation({ summary: 'update one provider' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async updateOneProvider(
    @Body() query: UpdateProviderDto,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.updateOneProvider', { query });

    const result = await this.commandBus.execute<
      UpdateProviderCommand,
      boolean | Error
    >(
      new UpdateProviderCommand(
        query.code,
        query.name,
        query.address,
        query.phoneNumber,
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
      message: result,
      error: undefined,
    };
  }

  @Delete('delete')
  @ApiOperation({ summary: 'delete one provider' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async deleteOneProvider(
    @Query() query: DeleteProviderDto,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.deleteOneProvider', { query });

    const result = await this.commandBus.execute<
      DeleteProviderCommand,
      boolean | Error
    >(new DeleteProviderCommand(query.code));

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
