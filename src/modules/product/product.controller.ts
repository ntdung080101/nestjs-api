import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FilesInterceptor } from '@nestjs/platform-express';
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
import { CreateProductDto } from '../../dtos/create-product.dto';
import { DeleteProductDto } from '../../dtos/delete-product.dto';
import { GetOneProductDto } from '../../dtos/get-one-product.dto';
import { ListAllProductDto } from '../../dtos/list-all-product.dto';
import { UpdateProductDto } from '../../dtos/update-product.dto';
import { Role } from '../../enums/role.enum';
import { RolesGuard } from '../../guard/roles.guard';
import { BaseResponseInterface } from '../../interfaces/common-interfaces/base.response.interface';
import { ListCategoryQuery } from '../category/queries/impl';
import { CreateProductImageCommand } from '../product-image/commands/impl';
import { ListProductImageQuery } from '../product-image/queries/impl';
import { CategoryEntity } from '../store/entities/category.entity';
import { ProductEntity } from '../store/entities/product.entity';
import { ProductImageEntity } from '../store/entities/product-image.entity';
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
  ): Promise<
    BaseResponseInterface<
      Array<ProductEntity & { imagePath?: Array<string>; loai: string }>
    >
  > {
    this.logger.verbose('.listAllProduct', { query });

    let result = await this.queryBus.execute<
      ListAllProductQuery,
      Array<ProductEntity & { loai: string }> | Error
    >(new ListAllProductQuery());

    if (result instanceof Error) {
      return {
        statusCode: 400,
        error: (result as Error).message,
        message: [],
      };
    }

    const listCategory = await this.queryBus.execute<
      ListCategoryQuery,
      Array<CategoryEntity> | Error
    >(new ListCategoryQuery());

    if (listCategory instanceof Error) {
      return {
        statusCode: 400,
        error: (listCategory as Error).message,
        message: [],
      };
    }

    result = result.map((el) => {
      const category = listCategory.find(
        (category) => category.ma === el.ma_loai,
      );

      return {
        ...el,
        loai: category === undefined ? '' : category.ten,
      };
    });

    const productFull: Array<
      ProductEntity & { imagePath: Array<string>; loai: string }
    > = result.map((el) => {
      return {
        ...el,
        imagePath: [],
      };
    });

    for (let index = 0; index < result.length; index++) {
      const imageResult = await this.queryBus.execute<
        ListProductImageQuery,
        Array<ProductImageEntity> | Error
      >(new ListProductImageQuery(result[index].ma));

      if (imageResult instanceof Error) {
        productFull[index]['imagePath'] = [''];
      } else {
        productFull[index]['imagePath'] = imageResult.map((el) => el.hinh_anh);
      }
    }

    return {
      statusCode: 200,
      message: productFull,
      error: undefined,
    };
  }

  @Get('get')
  @ApiOperation({ summary: 'get one product' })
  async getOneProductByCode(
    @Query() query: GetOneProductDto,
  ): Promise<
    BaseResponseInterface<
      ProductEntity & { imagePath?: Array<string>; loai: string }
    >
  > {
    this.logger.verbose('.getOneProductByCode', { query });

    const result = await this.queryBus.execute<
      GetOneProductQuery,
      (ProductEntity & { loai: string }) | Error
    >(new GetOneProductQuery(query.code));

    if (result instanceof Error) {
      return {
        statusCode: 400,
        error: (result as Error).message,
        message: [],
      };
    }

    const listCategory = await this.queryBus.execute<
      ListCategoryQuery,
      Array<CategoryEntity> | Error
    >(new ListCategoryQuery());

    if (listCategory instanceof Error) {
      return {
        statusCode: 400,
        error: (listCategory as Error).message,
        message: [],
      };
    }

    result.loai = listCategory.find((category) => category.ma === 1)?.ten ?? '';

    const product: ProductEntity & { loai: string; imagePath: Array<string> } =
      {
        ...result,
        imagePath: [],
      };

    const imageResult = await this.queryBus.execute<
      ListProductImageQuery,
      Array<ProductImageEntity> | Error
    >(new ListProductImageQuery(product.ma));

    if (imageResult instanceof Error) {
      product['imagePath'] = [''];
    } else {
      product['imagePath'] = imageResult.map((el) => el.hinh_anh);
    }

    return {
      statusCode: 200,
      message: product,
      error: undefined,
    };
  }

  @Post('create')
  @ApiOperation({ summary: 'create one product' })
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
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async createProduct(
    @Body() query: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.createProduct', { query });

    if (!files || files.length === 0) {
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

    for (let index = 0; index < files.length; index++) {
      const oldPath = files[index].path;

      const newPath = path.join(files[index].destination, fileUploaded[index]);

      fs.renameSync(oldPath, newPath);
    }

    const result = await this.commandBus.execute<
      CreateProductCommand,
      number | Error
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

    const uploadResult = await this.commandBus.execute<
      CreateProductImageCommand,
      boolean | Error
    >(new CreateProductImageCommand(fileUploaded, result));

    if (uploadResult instanceof Error) {
      return {
        statusCode: 400,
        error: (uploadResult as Error).message,
        message: [],
      };
    }

    return {
      statusCode: 201,
      message: true,
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
