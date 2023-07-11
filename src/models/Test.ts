import { DataType, Model, Table, Column } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "Test",
})
export class Test extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    title!: string;
}
