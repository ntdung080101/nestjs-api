export class DeleteProductImageCommand {
  constructor(
    public readonly code: number,
    public readonly productCode: number,
  ) {}
}
