import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../user/user.model";
import { Book } from "src/book/book.model";
import { ApiProperty } from "@nestjs/swagger";

interface CreateOrderAttrs{
    id_user: number,
    id_book: number
}

@Table({tableName: 'orders'})
export class OrderUserBook extends Model<OrderUserBook, CreateOrderAttrs>{
    @ApiProperty({example: '1', description: 'Id order'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '1', description: 'FK, Id user'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    id_user: number;

    @ApiProperty({example: '1', description: 'FK, Id book'})
    @ForeignKey(() => Book)
    @Column({type: DataType.INTEGER, allowNull: false})
    id_book: number;

    @ApiProperty({type: () => User, description: 'User'})
    @BelongsTo(() => User)
    user: User;

    @ApiProperty({type: () => Book, description: 'Book'})
    @BelongsTo(() => Book)
    bookOrder: Book;
}