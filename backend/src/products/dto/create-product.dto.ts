export class CreateProductDto {
  readonly name: string;

  readonly category_id: number;

  readonly manufacturer_id: number;

  readonly memory: number;

  readonly cost: number;

  readonly disk: string;

  readonly min_ram: number;
}
