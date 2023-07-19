import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./User";
import { Cart } from "./Cart";

@Table({
  timestamps: false,
  tableName: "orders",
})
export class Order extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
    email!: string;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
    status!: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    transaction_id!: string;
  @BelongsTo(() => User, "user_id")
    user!: User;
  @BelongsTo(() => Cart, "cart_id")
    cart!: Cart;
}
