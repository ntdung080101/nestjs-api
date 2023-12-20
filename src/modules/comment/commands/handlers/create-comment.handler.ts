import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CommentRepository } from '../../../store/repositories/comment.repository';
import { CreateCommentCommand } from '../impl';

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler
  implements ICommandHandler<CreateCommentCommand>
{
  private readonly logger = new Logger(CreateCommentHandler.name);

  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(query: CreateCommentCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    return this.commentRepository.createComment(
      query.staffCode,
      query.productCode,
      query.content,
      query.rely,
    );
  }
}
