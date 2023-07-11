import {
  BelongsToMany,
  Column,
  DataType, HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Product } from "./Product";

@Table({
  timestamps: false,
  tableName: "categories",
})
export class Category extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    title!: string;
  @HasMany(() => Product, "category_id")
    products!: Product[];
}
