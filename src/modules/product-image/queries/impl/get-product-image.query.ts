export class GetProductImageQuery {
  constructor(
    public readonly code: number,
    public readonly imagePath: string,
  ) {}
}
