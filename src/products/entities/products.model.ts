import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'products', timestamps: false })
export class Product extends Model<Product> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  category: number;
  // TODO FOREIGN

  @Column({ type: DataType.INTEGER, allowNull: false })
  manufacturer: number;
  // TODO FOREIGN

  @Column({ type: DataType.DOUBLE, allowNull: false })
  memory: number;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  cost: number;

  @Column({ type: DataType.STRING, allowNull: false })
  disk: string;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  min_ram: number;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  disk_space: number;
}
