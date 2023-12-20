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
import { CreateDetailOrderDto } from '../../dtos/create-detail-order.dto';
import { DeleteDetailOrderDto } from '../../dtos/delete-detail-order.dto';
import { GetOneDetailOrderDto } from '../../dtos/get-one-detail-order.dto';
import { ListAllDetailOrderDto } from '../../dtos/list-all-detail-order.dto';
import { UpdateDetailOrderDto } from '../../dtos/update-detail-order.dto';
import { Role } from '../../enums/role.enum';
import { RolesGuard } from '../../guard/roles.guard';
import { BaseResponseInterface } from '../../interfaces/common-interfaces/base.response.interface';
import { DetailOrderEntity } from '../store/entities/detail-order.entity';
import {
  CreateDetailOrderCommand,
  DeleteDetailOrderCommand,
  UpdateDetailOrderCommand,
} from './commands/impl';
import {
  GetOneDetailOrderQuery,
  ListAllDetailOrderQuery,
} from './queries/impl';

@Controller('detail-order')
@ApiTags('DetailOrder')
@ApiBearerAuth('jwt')
export class DetailOrderController {
  private readonly logger = new Logger(DetailOrderController.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list-all')
  @ApiOperation({ summary: 'list all detail order' })
  async listAllProduct(
    @Query() query: ListAllDetailOrderDto,
  ): Promise<BaseResponseInterface<Array<DetailOrderEntity>>> {
    this.logger.verbose('.listAllProduct', { query });

    const result = await this.queryBus.execute<
      ListAllDetailOrderQuery,
      Array<DetailOrderEntity> | Error
    >(new ListAllDetailOrderQuery(query.orderCode));

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
  @ApiOperation({ summary: 'get one detail order' })
  async getOneDetailOrderByCode(
    @Query() query: GetOneDetailOrderDto,
  ): Promise<BaseResponseInterface<DetailOrderEntity>> {
    this.logger.verbose('.getOneDetailOrderByCode', { query });

    const result = await this.queryBus.execute<
      GetOneDetailOrderQuery,
      DetailOrderEntity | Error
    >(new GetOneDetailOrderQuery(query.code));

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
  @ApiOperation({ summary: 'create one detail order' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async createDetailOrder(
    @Body() query: CreateDetailOrderDto,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.createDetailOrder', { query });

    const result = await this.commandBus.execute<
      CreateDetailOrderCommand,
      boolean | Error
    >(
      new CreateDetailOrderCommand(
        query.price,
        query.count,
        query.orderCode,
        query.productCode,
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
  @ApiOperation({ summary: 'update one detail order' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async updateOneDetailOrder(
    @Body() query: UpdateDetailOrderDto,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.updateOneDetailOrder', { query });

    const result = await this.commandBus.execute<
      UpdateDetailOrderCommand,
      boolean | Error
    >(
      new UpdateDetailOrderCommand(
        query.code,
        query.price,
        query.count,
        query.orderCode,
        query.productCode,
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
  @ApiOperation({ summary: 'delete one detail order' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async deleteOneDetailOrder(
    @Query() query: DeleteDetailOrderDto,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.deleteOneDetailOrder', { query });

    const result = await this.commandBus.execute<
      DeleteDetailOrderCommand,
      boolean | Error
    >(new DeleteDetailOrderCommand(query.code));

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
