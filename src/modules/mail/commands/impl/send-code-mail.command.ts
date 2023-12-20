export class SendCodeMailCommand {
  constructor(
    public readonly gmail: string,
    public readonly title: string,
    public readonly contain: string,
  ) {}
}
