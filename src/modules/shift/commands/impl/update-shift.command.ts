export class UpdateShiftCommand {
  constructor(
    public readonly code: number,
    public readonly staffCode: number,
    public readonly name: string,
    public readonly salary: number,
    public readonly startTime: string,
    public readonly endTime: string,
  ) {}
}
