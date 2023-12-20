export class CreateCommentCommand {
  constructor(
    public readonly staffCode: number,
    public readonly productCode: number,
    public readonly rely: number | null,
    public readonly content: string,
  ) {}
}
