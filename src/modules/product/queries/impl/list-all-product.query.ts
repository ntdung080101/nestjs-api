export class ListAllProductQuery {
  constructor(
    public readonly page: number,
    public readonly limit: number,
  ) {}
}
