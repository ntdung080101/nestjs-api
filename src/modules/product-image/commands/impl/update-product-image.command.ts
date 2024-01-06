export class UpdateProductImageCommand {
  constructor(
    public readonly code: number,
    public readonly oldPath: string,
    public readonly newPath: string,
  ) {}
}
