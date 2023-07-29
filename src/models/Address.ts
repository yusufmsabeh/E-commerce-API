import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./User";

@Table({
  timestamps: false,
  tableName: "addresses",
})
export class Address extends Model {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
    full_name!: string;
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
    mobile!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    city!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    state!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    street!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    pin_code!: string;
  @BelongsTo(() => User, "user_id")
    user!: User;
}
