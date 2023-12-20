export class CreateRateCommand {
  constructor(
    public readonly score: number,
    public readonly customerCode: number,
    public readonly productCode: number,
  ) {}
}
