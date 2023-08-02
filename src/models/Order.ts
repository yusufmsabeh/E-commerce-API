import {
  BelongsTo,
  Column,
  DataType, HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./User";
import { Cart } from "./Cart";
import {Address} from "./Address";

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
  @BelongsTo(()=>Address,"address_id")
    address!:Address;
}
