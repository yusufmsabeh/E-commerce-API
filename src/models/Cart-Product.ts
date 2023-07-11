import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Product } from "./Product";
import { Cart } from "./Cart";

@Table({
  timestamps: false,
  tableName: "cart_products",
})
export class CartProduct extends Model {
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
    product_id!: number;

  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
    cart_id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
    quantity!: number;
}
