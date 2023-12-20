export class DeleteCommentCommand {
  constructor(
    public readonly code: number,
    public readonly staffCode: number,
  ) {}
}
