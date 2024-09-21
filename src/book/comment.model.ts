import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";
import { Book } from "./book.model";
import { ApiProperty } from "@nestjs/swagger";

@Table({tableName: 'comments'})
export class Comment extends Model<Comment>{
    @ApiProperty({example: '1', description: 'id comment'})
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '1', description: 'FK, id user'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    id_user: number;

    @ApiProperty({example: '1', description: 'FK, id comment'})
    @ForeignKey(() => Book)
    @Column({type: DataType.INTEGER, allowNull: false})
    id_book: number;

    @ApiProperty({example: 'Some comment', description: 'Comment'})
    @Column({type: DataType.TEXT, allowNull: false})
    comment: string;

    @ApiProperty({type: () => User, description: 'User'})
    @BelongsTo(() => User)
    user: User;

    @ApiProperty({type: () => Book, description: 'Book'})
    @BelongsTo(() => Book)
    bookComment: Book;
}