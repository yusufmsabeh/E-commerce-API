import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Cart } from "./Cart";
import { CartProduct } from "./Cart-Product";
import { ProductImages } from "./Product-Images";
import { Favourites } from "./Favourites";
import { User } from "./User";
import { Variant } from "./Variant";
import { ProductVariant } from "./Product-Variant";
import { Category } from "./Category";
import { Brand } from "./Brand";

@Table({
  timestamps: true,
  tableName: "products",
})
export class Product extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
    description!: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
    price!: number;
  @Column({
    type: DataType.DOUBLE,
    allowNull: false
  })
    rate!: number;
  @Column({
    type:DataType.BOOLEAN,
    defaultValue:false,
    allowNull:false
  })
    isLimited!:boolean;
  @BelongsToMany(() => Cart, () => CartProduct)
    carts!: Cart[];
  @BelongsToMany(() => User, () => Favourites)
    users!: User[];
  @BelongsToMany(() => Variant, () => ProductVariant)
    variants!: Variant[];
  @BelongsTo(() => Category, "category_id")
    category!: Category;
  @BelongsTo(() => Brand, "brand_id")
    brand!: Brand;
  @HasMany(() => ProductImages, "product_id")
    productImages!: ProductImages[];
}
