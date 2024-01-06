import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ImageController } from './image.controller';

@Module({
  imports: [CqrsModule],
  controllers: [ImageController],
})
export class ImageModule {}
