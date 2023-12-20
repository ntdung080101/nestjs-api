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
import { CreateProductCategoryDto } from '../../dtos/create-product-category.dto';
import { DeleteCategoryDto } from '../../dtos/deleteCategory.dto';
import { ListCategoryDto } from '../../dtos/list-category.dto';
import { UpdateCategoryDto } from '../../dtos/update-category.dto';
import { Role } from '../../enums/role.enum';
import { RolesGuard } from '../../guard/roles.guard';
import { BaseResponseInterface } from '../../interfaces/common-interfaces/base.response.interface';
import { CategoryEntity } from '../store/entities/category.entity';
import {
  CreateCategoryCommand,
  DeleteCategoryCommand,
  UpdateCategoryCommand,
} from './commands/impl';
import { ListCategoryQuery } from './queries/impl';

@Controller('category')
@ApiTags('category')
@ApiBearerAuth('jwt')
export class CategoryController {
  private logger = new Logger(CategoryController.name);

  constructor(
    private queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'create new product category' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async createCategory(
    @Body() query: CreateProductCategoryDto,
  ): Promise<BaseResponseInterface<CategoryEntity>> {
    this.logger.verbose('.createCategory', { query });

    const result = await this.commandBus.execute<
      CreateCategoryCommand,
      CategoryEntity | Error
    >(new CreateCategoryCommand(query.ten, query.mota));

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

  @Get('list')
  @ApiOperation({ summary: 'list category of product' })
  async listCategory(
    @Query() query: ListCategoryDto,
  ): Promise<BaseResponseInterface<Array<CategoryEntity>>> {
    this.logger.verbose('.listCategory', { query });

    const result = await this.queryBus.execute<
      ListCategoryQuery,
      Array<CategoryEntity> | Error
    >(new ListCategoryQuery());

    if (result instanceof Error) {
      this.logger.error((result as Error).message);

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

  @Put('update')
  @ApiOperation({ summary: 'Update category of product' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async updateCategory(
    @Body() query: UpdateCategoryDto,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.updateCategory', { query });

    const result = await this.commandBus.execute<
      UpdateCategoryCommand,
      boolean | Error
    >(new UpdateCategoryCommand(query.code, query.name, query.describe));

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
  @ApiOperation({ summary: 'delete category of product' })
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  @UseGuards(RolesGuard)
  async deleteCategory(
    @Body() query: DeleteCategoryDto,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.deleteCategory', { query });

    const result = await this.commandBus.execute<
      DeleteCategoryCommand,
      boolean | Error
    >(new DeleteCategoryCommand(query.code));

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
