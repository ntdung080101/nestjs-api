export class UpdateProviderCommand {
  constructor(
    public readonly code: number,
    public readonly name: string,
    public readonly address: string,
    public readonly phoneNumber: string,
  ) {}
}
