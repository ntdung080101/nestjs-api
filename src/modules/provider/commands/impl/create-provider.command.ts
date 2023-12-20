export class CreateProviderCommand {
  constructor(
    public readonly name: string,
    public readonly address: string,
    public readonly phoneNumber: string,
  ) {}
}
