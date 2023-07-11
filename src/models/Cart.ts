import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./User";
import { Product } from "./Product";
import { CartProduct } from "./Cart-Product";
import { Order } from "./Order";

@Table({
  timestamps: false,
  tableName: "carts",
})
export class Cart extends Model {
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
    discount!: number;
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
    total_cost!: number;
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
    tax!: number;
  @BelongsTo(() => User, "user_id")
    user!: User;
  @BelongsToMany(() => Product, () => CartProduct)
    products!: Product[];
  @HasOne(() => Order, "cart_id")
    order!: Order;
}
