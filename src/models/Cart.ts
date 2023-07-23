import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./User";
import { Product } from "./Product";
import { CartProduct } from "./Cart-Product";
import { Order } from "./Order";
import getConnection from "../database/config";
import sequelize from "sequelize";

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
    defaultValue: 0,
  })
    status!: number;

  @BelongsTo(() => User, "user_id")
    user!: User;
  @BelongsToMany(() => Product, () => CartProduct)
    products!: Product[];
  @HasOne(() => Order, "cart_id")
    order!: Order;

  public async updateTotalCost(cart: Cart) {
    const result: any = await getConnection().query(
      {
        query:
          "SELECT SUM(cart_products.quantity * products.price) AS totalPrice FROM cart_products JOIN products ON cart_products.product_id = products.id WHERE cart_id = ?",
        values: [cart.id],
      },
      { type: sequelize.QueryTypes.SELECT }
    );
    const totalPrice: number = result[0].totalPrice ?? 0;
    const cartDiscount: number = cart.discount / 100;
    const tax = cart.tax;
    cart.total_cost = totalPrice - totalPrice * cartDiscount + tax;
    await cart.save();
  }
}
