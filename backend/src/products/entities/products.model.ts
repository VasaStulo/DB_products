import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from '../../category/entities/category.model';
import { Manufacturer } from '../../manufacturer/entities/manufacturer.model';

@Table({ tableName: 'products', timestamps: false })
export class Product extends Model<Product> {
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  memory: number;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  cost: number;

  @Column({ type: DataType.STRING, allowNull: false })
  disk: string;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  min_ram: number;

  //
  @ForeignKey(() => Manufacturer)
  @Column
  manufacturer_id: number;

  @BelongsTo(() => Manufacturer)
  manufacturer: Manufacturer;

  @ForeignKey(() => Category)
  @Column
  category_id: number;

  @BelongsTo(() => Category)
  category: Category;
}
