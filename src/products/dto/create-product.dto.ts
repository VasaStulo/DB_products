export class CreateProductDto {
  readonly name: string;

  readonly category: number;
  // TODO FOREIGN

  readonly manufacturer: number;
  // TODO FOREIGN

  readonly memory: number;

  readonly cost: number;

  readonly disk: string;

  readonly min_ram: number;

  readonly disk_space: number;
}
