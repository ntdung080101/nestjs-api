export class DeleteRateCommand {
  constructor(
    public readonly code: number,
    public readonly customerCode: number,
  ) {}
}
