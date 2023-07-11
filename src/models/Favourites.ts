import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Product } from "./Product";
import { User } from "./User";

@Table({
  timestamps: false,
  tableName: "Favourites",
})
export class Favourites extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
    user_id!: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
    product_id!: string;
}
