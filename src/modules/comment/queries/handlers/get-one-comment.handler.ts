import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CommentEntity } from '../../../store/entities/comment.entity';
import { CommentRepository } from '../../../store/repositories/comment.repository';
import { GetOneCommentQuery } from '../impl';

@QueryHandler(GetOneCommentQuery)
export class GetOneCommentHandler implements IQueryHandler<GetOneCommentQuery> {
  private readonly logger = new Logger(GetOneCommentHandler.name);

  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(query: GetOneCommentQuery): Promise<CommentEntity | Error> {
    this.logger.verbose('.execute', { query });

    return this.commentRepository.findOneComment(query.code);
  }
}
