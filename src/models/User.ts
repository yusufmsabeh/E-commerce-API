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
import { Favourite } from "./Favourites";
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
    unique: "email",
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

  public async getCart(): Promise<Cart> {
    const [cart] = await Cart.findOrCreate<Cart>({
      where: { status: 0, user_id: this.id },
    });
    return cart;
  }

  @HasMany(() => Address, "user_id")
    addresses!: Address[];
  @HasMany(() => Cart, "user_id")
    carts!: Cart[];
  @HasMany(() => Order, "user_id")
    orders!: Order[];
  @BelongsToMany(() => Product, () => Favourite)
    favourites!: Product[];
}
