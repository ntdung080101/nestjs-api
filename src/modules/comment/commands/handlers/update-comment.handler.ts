import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CommentRepository } from '../../../store/repositories/comment.repository';
import { UpdateCommentCommand } from '../impl';

@CommandHandler(UpdateCommentCommand)
export class UpdateCommentHandler
  implements ICommandHandler<UpdateCommentCommand>
{
  private readonly logger = new Logger(UpdateCommentHandler.name);

  constructor(private readonly commentRepository: CommentRepository) {}
  async execute(query: UpdateCommentCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    return this.commentRepository.updateComment(
      query.code,
      query.staffCode,
      query.content,
    );
  }
}
