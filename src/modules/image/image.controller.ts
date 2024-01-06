import { Controller, Get, Logger, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import fs from 'fs';
import path from 'path';

@Controller('image')
@ApiTags('image')
export class ImageController {
  private readonly logger = new Logger(ImageController.name);

  constructor(private readonly queryBus: QueryBus) {}

  @Get('/:imagePath')
  async getImage(@Param('imagePath') imagePath: string): Promise<unknown> {
    this.logger.verbose('.getImage', { imagePath, dirname: __dirname });

    const pathFile = path.join(__dirname, imagePath);
    const isExists = fs.existsSync(pathFile);

    if (!isExists) {
      return {
        statusCode: 400,
        message: [],
        error: 'File not found!',
      };
    }

    const imageStream = fs.createReadStream(pathFile);

    return imageStream;
  }
}
