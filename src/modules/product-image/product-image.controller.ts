import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

import { Roles } from '../../decorator/roles.decorator';
import { DeleteProductImageDto } from '../../dtos/delete-product-image.dto';
import { UpdateProductImageDto } from '../../dtos/update-product-image.dto';
import { Role } from '../../enums/role.enum';
import { RolesGuard } from '../../guard/roles.guard';
import { BaseResponseInterface } from '../../interfaces/common-interfaces/base.response.interface';
import { ProductImageEntity } from '../store/entities/product-image.entity';
import {
  CreateProductImageCommand,
  DeleteProductImageCommand,
  UpdateProductImageCommand,
} from './commands/impl';
import { GetProductImageQuery, ListProductImageQuery } from './queries/impl';

@Controller('product-image')
@ApiTags('ProductImage')
@ApiBearerAuth('jwt')
export class ProductImageController {
  private readonly logger = new Logger(ProductImageController.name);
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOperation({ summary: 'list image of product' })
  async listImage(
    @Query() query: ListProductImageQuery,
  ): Promise<BaseResponseInterface<Array<ProductImageEntity>>> {
    this.logger.verbose('.listImage', { query });

    const result = await this.queryBus.execute<
      ListProductImageQuery,
      Array<ProductImageEntity> | Error
    >(new ListProductImageQuery(query.productCode));

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

  @Post('upload-image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'string',
          format: 'binary',
        },
        code: {
          type: 'number',
          format: 'number',
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', 6, {
      fileFilter: (req, file, cb) => {
        file.filename = Date.now() + '-' + file.originalname;

        cb(null, true);
      },
    }),
  )
  async uploadImage(
    @Body('code') code: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.uploadImage', { files });

    if (files.length === 0) {
      return {
        statusCode: 400,
        message: [],
        error: 'Files not found',
      };
    }

    const fileUploaded = files.map((img) => {
      const ext = '.' + img.originalname.split('.').splice(-1).toString();

      return img.filename + ext;
    });

    const result = await this.commandBus.execute<
      CreateProductImageCommand,
      boolean | Error
    >(new CreateProductImageCommand(fileUploaded, code));

    if (result instanceof Error) {
      return {
        statusCode: 400,
        message: [],
        error: (result as Error).message,
      };
    }

    for (let index = 0; index < files.length; index++) {
      const oldPath = files[index].path;
      const newPath = path.join(files[index].destination, fileUploaded[index]);
      fs.renameSync(oldPath, newPath);
    }

    return {
      statusCode: 201,
      message: true,
      error: undefined,
    };
  }

  @Put('update')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        code: {
          type: 'number',
          format: 'number',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        file.filename = Date.now() + '-' + file.originalname;

        cb(null, true);
      },
    }),
  )
  async updateImage(
    @Body() query: UpdateProductImageDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.update', { file });

    if (!file) {
      return {
        statusCode: 400,
        message: [],
        error: 'File not found',
      };
    }

    const image = await this.queryBus.execute<
      GetProductImageQuery,
      ProductImageEntity | Error
    >(new GetProductImageQuery(query.productCode, query.oldPath));

    if (image instanceof Error) {
      return {
        statusCode: 400,
        message: [],
        error: image.message,
      };
    }

    const fileUploaded =
      file.filename + '.' + file.originalname.split('.').splice(-1).toString();

    const result = await this.commandBus.execute<
      UpdateProductImageCommand,
      boolean | Error
    >(
      new UpdateProductImageCommand(
        query.productCode,
        query.oldPath,
        fileUploaded,
      ),
    );

    if (result instanceof Error) {
      return {
        statusCode: 400,
        message: [],
        error: (result as Error).message,
      };
    }

    const oldPath = file.path;
    const newPath = path.join(file.destination, fileUploaded);
    fs.renameSync(oldPath, newPath);

    if (fs.existsSync(path.join(file.destination, query.oldPath))) {
      fs.unlinkSync(path.join(file.destination, query.oldPath));
    }

    return {
      statusCode: 201,
      message: true,
      error: undefined,
    };
  }

  @Delete('delete')
  @ApiOperation({ summary: 'delete one image' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async deleteOneImage(
    @Query() query: DeleteProductImageDto,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.deleteOneComment', { query });

    const result = await this.commandBus.execute<
      DeleteProductImageCommand,
      boolean | Error
    >(new DeleteProductImageCommand(query.code, query.productCode));

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
