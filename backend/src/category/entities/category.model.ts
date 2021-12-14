import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Product } from '../../products/entities/products.model';

@Table({ tableName: 'category', timestamps: false })
export class Category extends Model<Category> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @HasMany(() => Product)
  product: Product[];
}
