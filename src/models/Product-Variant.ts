import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "./User";
import {Product} from "./Product";
import {Variant} from "./Variant";

@Table({
  timestamps:false,
  tableName:"products_variants"
})

export class ProductVariant extends Model{
    @ForeignKey(() => Variant)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true,
    })
      variant_id!: number;

    @ForeignKey(() => Product)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true,
    })
      product_id!: number;

}