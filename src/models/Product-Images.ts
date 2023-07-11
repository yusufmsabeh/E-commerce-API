import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Product } from "./Product";

@Table({
  timestamps: false,
  tableName: "product_images",
})
export class ProductImages extends Model {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
    image_url!: string;
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
    image_alt!: string;

  @BelongsTo(() => Product, "product_id")
    product!: Product;
}
