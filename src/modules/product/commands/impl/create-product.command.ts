export class CreateProductCommand {
  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly categoryCode: number,
    public readonly count: number,
    public readonly describe: string,
    public readonly ram: string,
    public readonly hardDrive: string,
    public readonly screen: string,
  ) {}
}
