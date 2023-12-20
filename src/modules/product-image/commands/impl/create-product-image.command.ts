export class CreateProductImageCommand {
  constructor(
    public readonly image: Array<string>,
    public readonly productCode: number,
  ) {}
}
