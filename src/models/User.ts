import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Address } from "./Address";
import { Cart } from "./Cart";
import { Product } from "./Product";
import { Favourites } from "./Favourites";
import { Order } from "./Order";

@Table({
  timestamps: false,
  tableName: "users",
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    first_name!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    last_name!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    mobile!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
    email!: string;
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
    date_of_birth!: Date;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    password!: string;

  public async getCart(user: User): Promise<Cart> {
    let cart: Cart | null = (
      await user.$get("carts", {
        where: {
          status: 0,
        },
      })
    )[0];

    if (!cart) {
      cart = await user.$create<Cart>("cart", {});
    }
    return cart;
  }

  @HasMany(() => Address, "user_id")
    addresses!: Address[];
  @HasMany(() => Cart, "user_id")
    carts!: Cart[];
  @HasMany(() => Order, "user_id")
    orders!: Order[];
  @HasMany(() => Favourites, "user_id")
    favourites!: Favourites[];
}
