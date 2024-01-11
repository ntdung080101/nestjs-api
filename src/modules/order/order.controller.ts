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
import { CreateOrderDto } from '../../dtos/create-order.dto';
import { DeleteOrderDto } from '../../dtos/delete-order.dto';
import { GetOrderDto } from '../../dtos/get-order.dto';
import { ListAllOrderDto } from '../../dtos/list-all-order.dto';
import { UpdateOrderDto } from '../../dtos/update-order.dto';
import { Role } from '../../enums/role.enum';
import { RolesGuard } from '../../guard/roles.guard';
import { BaseResponseInterface } from '../../interfaces/common-interfaces/base.response.interface';
import { OrderEntity } from '../store/entities/order.entity';
import {
  CreateOrderCommand,
  DeleteOrderCommand,
  UpdateOrderCommand,
} from './commands/impl';
import { GetOneOrderQuery, ListAllOrderQuery } from './queries/impl';

@Controller('order')
@ApiTags('Order')
@ApiBearerAuth('jwt')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list-all')
  @ApiOperation({ summary: 'list all order' })
  async listAllOrder(
    @Query() query: ListAllOrderDto,
  ): Promise<BaseResponseInterface<Array<OrderEntity>>> {
    this.logger.verbose('.listAllOrder', { query });

    const result = await this.queryBus.execute<
      ListAllOrderQuery,
      Array<OrderEntity> | Error
    >(new ListAllOrderQuery());

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
  @ApiOperation({ summary: 'get one order' })
  async getOneOrderByCode(
    @Query() query: GetOrderDto,
  ): Promise<BaseResponseInterface<OrderEntity>> {
    this.logger.verbose('.getOneOrderByCode', { query });

    const result = await this.queryBus.execute<
      GetOneOrderQuery,
      OrderEntity | Error
    >(new GetOneOrderQuery(query.code));

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
  @ApiOperation({ summary: 'create one order' })
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF, Role.CUSTOMER)
  @UseGuards(RolesGuard)
  async createOrder(
    @Body() query: CreateOrderDto,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.createOrder', { query });

    const result = await this.commandBus.execute<
      CreateOrderCommand,
      boolean | Error
    >(
      new CreateOrderCommand(
        query.name,
        query.phoneNumber,
        query.discount,
        query.address,
        query.customerCode,
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
  @ApiOperation({ summary: 'update one order side admin' })
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF, Role.CUSTOMER)
  @UseGuards(RolesGuard)
  async updateOneOrder(
    @Body() query: UpdateOrderDto,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.updateOneOrder', { query });

    const result = await this.commandBus.execute<
      UpdateOrderCommand,
      boolean | Error
    >(
      new UpdateOrderCommand(
        query.code,
        query.name,
        query.phoneNumber,
        query.discount,
        query.address,
        query.customerCode,
        query.statusOrder,
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
  @ApiOperation({ summary: 'delete one order' })
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF, Role.CUSTOMER)
  @UseGuards(RolesGuard)
  async deleteOneOrder(
    @Query() query: DeleteOrderDto,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.deleteOneOrder', { query });

    const result = await this.commandBus.execute<
      DeleteOrderCommand,
      boolean | Error
    >(new DeleteOrderCommand(query.code));

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
