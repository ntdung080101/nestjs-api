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
import { CreateProductDto } from '../../dtos/create-product.dto';
import { DeleteProductDto } from '../../dtos/delete-product.dto';
import { GetOneProductDto } from '../../dtos/get-one-product.dto';
import { ListAllProductDto } from '../../dtos/list-all-product.dto';
import { UpdateProductDto } from '../../dtos/update-product.dto';
import { Role } from '../../enums/role.enum';
import { RolesGuard } from '../../guard/roles.guard';
import { BaseResponseInterface } from '../../interfaces/common-interfaces/base.response.interface';
import { ProductEntity } from '../store/entities/product.entity';
import {
  CreateProductCommand,
  DeleteProductCommand,
  UpdateProductCommand,
} from './commands/impl';
import { GetOneProductQuery, ListAllProductQuery } from './queries/impl';

@Controller('product')
@ApiTags('Product')
@ApiBearerAuth('jwt')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list-all')
  @ApiOperation({ summary: 'list all product' })
  async listAllProduct(
    @Query() query: ListAllProductDto,
  ): Promise<BaseResponseInterface<Array<ProductEntity>>> {
    this.logger.verbose('.listAllProduct', { query });

    const result = await this.queryBus.execute<
      ListAllProductQuery,
      Array<ProductEntity> | Error
    >(new ListAllProductQuery());

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
  @ApiOperation({ summary: 'get one product' })
  async getOneProductByCode(
    @Query() query: GetOneProductDto,
  ): Promise<BaseResponseInterface<ProductEntity>> {
    this.logger.verbose('.getOneProductByCode', { query });

    const result = await this.queryBus.execute<
      GetOneProductQuery,
      ProductEntity | Error
    >(new GetOneProductQuery(query.code));

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
  @ApiOperation({ summary: 'create one product' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async createProduct(
    @Body() query: CreateProductDto,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.createProduct', { query });

    const result = await this.commandBus.execute<
      CreateProductCommand,
      boolean | Error
    >(
      new CreateProductCommand(
        query.name,
        query.price,
        query.categoryCode,
        query.count,
        query.describe,
        query.ram,
        query.hardDrive,
        query.screen,
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
  @ApiOperation({ summary: 'update one product' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async updateOneProduct(
    @Body() query: UpdateProductDto,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.updateOneProduct', { query });

    const result = await this.commandBus.execute<
      UpdateProductCommand,
      boolean | Error
    >(
      new UpdateProductCommand(
        query.code,
        query.name,
        query.price,
        query.categoryCode,
        query.count,
        query.describe,
        query.ram,
        query.hardDrive,
        query.screen,
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
  @ApiOperation({ summary: 'delete one product' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async deleteOneProduct(
    @Query() query: DeleteProductDto,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.deleteOneProduct', { query });

    const result = await this.commandBus.execute<
      DeleteProductCommand,
      boolean | Error
    >(new DeleteProductCommand(query.code));

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
