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
import {CART_STATUS} from "../enums/status-enums";

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

  public async updateTotalCost() {
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
        cart_id: this.id,
      },
      raw: true,
    });

    this.total_cost=0;
    if (result.length>0) {
      const totalPrice = result[0].totalPrice ?? 0;
      const cartDiscount: number = this.discount / 100;
      const tax = this.tax;
      this.total_cost = totalPrice - totalPrice * cartDiscount + tax;
    }
    await this.save();
  }
}
