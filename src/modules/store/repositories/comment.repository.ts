import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentEntity } from '../entities/comment.entity';

@Injectable()
export class CommentRepository {
  private logger = new Logger(CommentRepository.name);
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async listAllComment(
    productCode: number,
  ): Promise<Array<CommentEntity> | Error> {
    try {
      this.logger.verbose('.findOneAccount', { productCode });

      return this.commentRepository.find({
        where: { ma_san_pham: productCode },
      });
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async findOneComment(code: number): Promise<CommentEntity | Error> {
    try {
      this.logger.verbose('.findOneAccount', { code });

      const result = await this.commentRepository.findOne({
        where: { ma: code },
      });

      if (result === null) {
        return new Error('Not found comment');
      }

      return result;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async createComment(
    staffCode: number,
    productCode: number,
    content: string,
    reply: number | null,
  ): Promise<boolean | Error> {
    try {
      this.logger.verbose('.createComment', {
        staffCode,
        productCode,
        content,
        reply,
      });

      const insertResult = await this.commentRepository.insert({
        ma_khach_hang: staffCode,
        ma_san_pham: productCode,
        noi_dung: content,
        tra_loi: reply,
        thoi_gian: new Date().toISOString,
      });

      this.logger.debug(JSON.stringify(insertResult, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async updateComment(
    code: number,
    staffCode: number,
    content: string,
  ): Promise<boolean | Error> {
    try {
      this.logger.verbose('.createComment', {
        code,
        staffCode,
        content,
      });

      const insertResult = await this.commentRepository.update(
        {
          ma: code,
          ma_khach_hang: staffCode,
        },
        { noi_dung: content },
      );

      this.logger.debug(JSON.stringify(insertResult, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async deleteComment(
    code: number,
    staffCode: number,
  ): Promise<boolean | Error> {
    try {
      this.logger.verbose('.findOneAccount', { code });

      const result = await this.commentRepository.delete({
        ma: code,
        ma_khach_hang: staffCode,
      });

      this.logger.debug(JSON.stringify(result, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }
}
