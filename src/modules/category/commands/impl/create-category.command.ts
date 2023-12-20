export class CreateCategoryCommand {
  constructor(
    public readonly name: string,
    public readonly describe: string,
  ) {}
}
