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
    const connection = getConnection();
    const result: any = await CartProduct.findAll({
      attributes: [
        [connection.literal("quantity*products.price"), "totalPrice"],
      ],
      include: [
        {
          model: Product,
          attributes: [],
        },
      ],
      where: {
        cart_id: cart.id,
      },
      raw: true,
    });
    console.log(result);
    const totalPrice: number = result[0].totalPrice ?? 0;
    const cartDiscount: number = cart.discount / 100;
    const tax = cart.tax;
    cart.total_cost = totalPrice - totalPrice * cartDiscount + tax;
    await cart.save();
  }
}
