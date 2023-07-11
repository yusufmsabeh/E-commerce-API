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
    type: DataType.STRING,
    allowNull: false,
  })
    city!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    street!: string;
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
    description!: string;
  @BelongsTo(() => User, "user_id")
    user!: User;
}
