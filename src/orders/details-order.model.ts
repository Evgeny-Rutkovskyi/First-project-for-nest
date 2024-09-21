import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";


@Table({tableName: 'detailorder'})
export class OrderDetail extends Model<OrderDetail>{
    @ApiProperty({example: '1', description: 'Id order'})
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false, unique: true})
    id_order: number;

    @ApiProperty({example: '1', description: 'FK, Id user'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    id_user: number;

    @ApiProperty({example: '400', description: 'Bonus user'})
    @Column({type: DataType.INTEGER, allowNull: false})
    user_bonus: number;

    @ApiProperty({example: '567', description: 'Order price'})
    @Column({type: DataType.INTEGER, allowNull: false})
    order_sum: number;

    @ApiProperty({example: '400', description: 'Order price by self'})
    @Column(({type: DataType.INTEGER, allowNull: false}))
    order_sum_self: number;

    @ApiProperty({example: '3', description: 'Quantity book'})
    @Column({type: DataType.INTEGER, allowNull: false})
    number_of_books: number;

    @ApiProperty({type: () => User, description: 'User'})
    @BelongsTo(() => User)
    user: User;
}