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
  tableName: "brands",
})
export class Brand extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    title!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    image_url!: string;
  @HasMany(() => Product, "brand_id")
    products!: Product[];
}
