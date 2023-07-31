import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import * as cartServices from "../services/cart";
import { User } from "./User";
import { Product } from "./Product";
import { CartProduct } from "./Cart-Product";
import { Order } from "./Order";
import { CART_STATUS } from "../enums/status-enums";

@Table({
  timestamps: false,
  tableName: "carts",
})
export class Cart extends Model {
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  })
    discount!: number;
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  })
    total_cost!: number;
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  })
    tax!: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: CART_STATUS.IN_PROGRESS,
  })
    status!: number;

  @BelongsTo(() => User, "user_id")
    user!: User;
  @BelongsToMany(() => Product, () => CartProduct)
    products!: Product[];
  @HasOne(() => Order, "cart_id")
    order!: Order;
}
