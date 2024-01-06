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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
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
import { CreateStaffDto } from '../../dtos/create-staff.dto';
import { DeleteStaffByCodeDto } from '../../dtos/delete-staff-by-code.dto';
import { GetStaffDto } from '../../dtos/get-staff.dto';
import { ListAllStaffDto } from '../../dtos/list-all-staff.dto';
import { UpdateStaffDto } from '../../dtos/update-staff.dto';
import { AccountRules, Role } from '../../enums/role.enum';
import { RolesGuard } from '../../guard/roles.guard';
import { BaseResponseInterface } from '../../interfaces/common-interfaces/base.response.interface';
import {
  CreateAccountCommand,
  DeleteAccountCommand,
} from '../account/commands/impl';
import { AccountEntity } from '../store/entities';
import { StaffEntity } from '../store/entities/staff.entity';
import {
  CreateStaffCommand,
  DeleteStaffByCodeCommand,
  UpdateStaffCommand,
} from './commands/impl';
import { GetStaffByCodeQuery, ListAllStaffQuery } from './queries/impl';

@Controller('staff')
@ApiTags('Staff')
@ApiBearerAuth('jwt')
export class StaffController {
  private readonly logger = new Logger(StaffController.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('get')
  @ApiOperation({
    summary: 'get one staff',
  })
  async getOneStaff(
    @Query() query: GetStaffDto,
  ): Promise<BaseResponseInterface<StaffEntity>> {
    this.logger.verbose('.getOneStaff', { query: query });

    const result = await this.queryBus.execute<
      GetStaffByCodeQuery,
      StaffEntity | Error
    >(new GetStaffByCodeQuery(query.code));

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
    summary: 'list all staff',
  })
  async listAllStaff(
    @Query() query: ListAllStaffDto,
  ): Promise<BaseResponseInterface<Array<StaffEntity>>> {
    this.logger.verbose('.listAllStaff', { query });

    const result = await this.queryBus.execute<
      ListAllStaffQuery,
      Array<StaffEntity> | Error
    >(new ListAllStaffQuery());

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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'string',
          format: 'binary',
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
  async createStaff(
    @Body() query: CreateStaffDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.createStaff', { file, query });

    let fileUploaded = '';

    if (file) {
      fileUploaded =
        file.filename +
        '.' +
        file.originalname.split('.').splice(-1).toString();

      const oldPath = file.path;
      const newPath = path.join(file.destination, fileUploaded);

      fs.renameSync(oldPath, newPath);
    }

    this.logger.verbose('.createStaff', { query });

    const accountResult = await this.commandBus.execute<
      CreateAccountCommand,
      AccountEntity | Error
    >(
      new CreateAccountCommand(
        query.username,
        query.password,
        AccountRules.STAFF,
      ),
    );

    if (accountResult instanceof Error) {
      return {
        statusCode: 400,
        error: (accountResult as Error).message,
        message: [],
      };
    }

    const result = await this.commandBus.execute<
      CreateStaffCommand,
      boolean | Error
    >(
      new CreateStaffCommand(
        query.name,
        query.address,
        query.gender,
        query.phoneNumber,
        query.role,
        accountResult.ma,
        fileUploaded,
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
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
  @ApiOperation({ summary: 'update staff information' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async updateStaff(
    @Body() query: UpdateStaffDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('updateStaff', { query });

    const staffResult = await this.queryBus.execute<
      GetStaffByCodeQuery,
      StaffEntity | Error
    >(new GetStaffByCodeQuery(query.code));

    if (staffResult instanceof Error) {
      return {
        statusCode: 400,
        error: (staffResult as Error).message,
        message: [],
      };
    }

    let fileUploaded = '';
    const oldPath = staffResult.hinh_anh ?? '';

    if (file) {
      fileUploaded =
        file.filename +
        '.' +
        file.originalname.split('.').splice(-1).toString();

      const oldPath = file.path;
      const newPath = path.join(file.destination, fileUploaded);

      fs.renameSync(oldPath, newPath);
    }

    const result = await this.commandBus.execute<
      UpdateStaffCommand,
      boolean | Error
    >(
      new UpdateStaffCommand(
        query.code,
        query.name,
        query.address,
        query.phoneNumber,
        query.gender,
        query.permission,
        fileUploaded === '' ? oldPath : fileUploaded,
      ),
    );

    if (result instanceof Error) {
      return {
        statusCode: 400,
        error: (result as Error).message,
        message: [],
      };
    }

    if (oldPath != '' && fileUploaded != '') {
      const oldFile = path.join(file.destination, oldPath);
      if (fs.existsSync(oldFile)) {
        fs.unlinkSync(oldFile);
      }
    }

    return {
      statusCode: 200,
      message: true,
      error: undefined,
    };
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Delete staff' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async deleteStaff(
    @Body() query: DeleteStaffByCodeDto,
  ): Promise<BaseResponseInterface<boolean>> {
    this.logger.verbose('.deleteStaff', { query });

    const result = await this.commandBus.execute<
      DeleteStaffByCodeCommand,
      boolean | Error
    >(new DeleteStaffByCodeCommand(query.code));

    if (result instanceof Error) {
      return {
        statusCode: 400,
        error: (result as Error).message,
        message: [],
      };
    }

    await this.commandBus.execute<DeleteAccountCommand, boolean | Error>(
      new DeleteAccountCommand(query.code),
    );

    return {
      statusCode: 200,
      message: true,
      error: undefined,
    };
  }
}
