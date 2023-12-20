import { GetOneCommentHandler } from './get-one-comment.handler';
import { ListAllCommentHandler } from './list-all-comment.handler';

export const COMMENT_QUERY_HANDLERS = [
  ListAllCommentHandler,
  GetOneCommentHandler,
];
