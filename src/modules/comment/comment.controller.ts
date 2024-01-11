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
import { CreateCommentDto } from '../../dtos/create-comment.dto';
import { DeleteCommentDto } from '../../dtos/delete-comment.dto';
import { GetOneCommentDto } from '../../dtos/get-one-comment.dto';
import { ListAllCommentDto } from '../../dtos/list-all-comment.dto';
import { UpdateCommentDto } from '../../dtos/update-comment.dto';
import { Role } from '../../enums/role.enum';
import { RolesGuard } from '../../guard/roles.guard';
import { BaseResponseInterface } from '../../interfaces/common-interfaces/base.response.interface';
import { GetCustomerQuery } from '../customer/queries/impl';
import { CommentEntity } from '../store/entities/comment.entity';
import { CustomerEntity } from '../store/entities/customer.entity';
import {
  CreateCommentCommand,
  DeleteCommentCommand,
  UpdateCommentCommand,
} from './commands/impl';
import { GetOneCommentQuery, ListAllCommentQuery } from './queries/impl';

@Controller('comment')
@ApiTags('Comment')
@ApiBearerAuth('jwt')
export class CommentController {
  private readonly logger = new Logger(CommentController.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list-all')
  @ApiOperation({ summary: 'list all comment of product' })
  async listAllComment(
    @Query() query: ListAllCommentDto,
  ): Promise<
    BaseResponseInterface<
      Array<CommentEntity & { khach_hang?: CustomerEntity }>
    >
  > {
    this.logger.verbose('.listAllComment', { query });

    const result = await this.queryBus.execute<
      ListAllCommentQuery,
      Array<CommentEntity & { khach_hang?: CustomerEntity }> | Error
    >(new ListAllCommentQuery(query.productCode));

    if (result instanceof Error) {
      return {
        statusCode: 400,
        error: (result as Error).message,
        message: [],
      };
    }

    for (let index = 0; index < result.length; index++) {
      const id = result[index].ma_khach_hang;

      const khachhang = await this.queryBus.execute<
        GetCustomerQuery,
        CustomerEntity | Error
      >(new GetCustomerQuery(id));

      if (!(khachhang instanceof Error)) {
        result[index].khach_hang = khachhang;
      }
    }

    return {
      statusCode: 200,
      message: result,
      error: undefined,
    };
  }

  @Get('get')
  @ApiOperation({ summary: 'get one comment of product' })
  async getOneCommentByCode(
    @Query() query: GetOneCommentDto,
  ): Promise<BaseResponseInterface<CommentEntity>> {
    this.logger.verbose('.getOneCommentByCode', { query });

    const result = await this.queryBus.execute<
      GetOneCommentQuery,
      CommentEntity | Error
    >(new GetOneCommentQuery(query.code));

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
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF, Role.CUSTOMER)
  @UseGuards(RolesGuard)
  async createComment(
    @Body() query: CreateCommentDto,
    @Headers() headers: Record<string, never>,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.createProvider', { query });

    const userId = headers['info']['ma'];

    const result = await this.commandBus.execute<
      CreateCommentCommand,
      boolean | Error
    >(
      new CreateCommentCommand(
        userId,
        query.productCode,
        query.rely,
        query.content,
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
  @ApiOperation({ summary: 'update one comment' })
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF, Role.CUSTOMER)
  @UseGuards(RolesGuard)
  async updateOneComment(
    @Body() query: UpdateCommentDto,
    @Headers() headers: Record<string, never>,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.updateOneComment', { query, headers });

    const userId = headers['info']['ma_tai_khoan'];

    const result = await this.commandBus.execute<
      UpdateCommentCommand,
      boolean | Error
    >(new UpdateCommentCommand(query.code, userId, query.content));

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
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF, Role.CUSTOMER)
  @UseGuards(RolesGuard)
  async deleteOneComment(
    @Query() query: DeleteCommentDto,
    @Headers() headers: Record<string, never>,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.deleteOneComment', { query });

    const userId = headers['info']['ma_tai_khoan'];

    const result = await this.commandBus.execute<
      DeleteCommentCommand,
      boolean | Error
    >(new DeleteCommentCommand(query.code, userId));

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
