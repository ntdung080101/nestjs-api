import { CreateCommentHandler } from './create-comment.handler';
import { DeleteCommentHandler } from './delete-comment.handler';
import { UpdateCommentHandler } from './update-comment.handler';

export const COMMENT_COMMAND_HANDLERS = [
  CreateCommentHandler,
  UpdateCommentHandler,
  DeleteCommentHandler,
];
