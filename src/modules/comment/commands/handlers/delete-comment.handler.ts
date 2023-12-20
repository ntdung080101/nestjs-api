import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CommentRepository } from '../../../store/repositories/comment.repository';
import { DeleteCommentCommand } from '../impl';

@CommandHandler(DeleteCommentCommand)
export class DeleteCommentHandler
  implements ICommandHandler<DeleteCommentCommand>
{
  private readonly logger = new Logger(DeleteCommentHandler.name);

  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(query: DeleteCommentCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    return this.commentRepository.deleteComment(query.code, query.staffCode);
  }
}
