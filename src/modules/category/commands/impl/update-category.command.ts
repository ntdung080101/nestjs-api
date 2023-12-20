export class UpdateCategoryCommand {
  constructor(
    public readonly code: number,
    public readonly name: string,
    public readonly describe: string,
  ) {}
}
