import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CommentEntity } from '../../../store/entities/comment.entity';
import { CommentRepository } from '../../../store/repositories/comment.repository';
import { ListAllCommentQuery } from '../impl';

@QueryHandler(ListAllCommentQuery)
export class ListAllCommentHandler
  implements IQueryHandler<ListAllCommentQuery>
{
  private readonly logger = new Logger(ListAllCommentQuery.name);

  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(
    query: ListAllCommentQuery,
  ): Promise<Array<CommentEntity> | Error> {
    this.logger.verbose('.execute', { query });

    return this.commentRepository.listAllComment(query.productCode);
  }
}
