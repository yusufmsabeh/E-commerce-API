import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { ProductVariant } from "./Product-Variant";
import { Product } from "./Product";

@Table({
  timestamps: false,
  tableName: "variants",
})
export class Variant extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    title!: string;
  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
    options!: any;
  @BelongsToMany(() => Product, () => ProductVariant)
    products!: Product[];
}
