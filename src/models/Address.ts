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
    country_code!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    mobile!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    location!: string;

  @BelongsTo(() => User, "user_id")
    user!: User;
}
