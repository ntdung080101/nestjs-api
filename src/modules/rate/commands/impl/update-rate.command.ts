export class UpdateRateCommand {
  constructor(
    public readonly code: number,
    public readonly score: number,
    public readonly customerCode: number,
  ) {}
}
