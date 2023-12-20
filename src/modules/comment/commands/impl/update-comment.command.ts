export class UpdateCommentCommand {
  constructor(
    public readonly code: number,
    public readonly staffCode: number,
    public readonly content: string,
  ) {}
}
