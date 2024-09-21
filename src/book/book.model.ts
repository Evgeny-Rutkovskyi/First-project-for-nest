import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { OrderUserBook } from "../orders/order-user-book.model"
import { Author } from "./author.model";
import { Comment } from "./comment.model";
import { BookAuthor } from "./book_author.model";
import { User } from "src/user/user.model";
import { ApiProperty } from "@nestjs/swagger";

interface CreateBookAttrs{
    name: string,
    pages: number,
    price: number,
    units_in_stock: number,
    genre: string,
    year_of_release: number
}

@Table({tableName: 'books'})
export class Book extends Model<Book, CreateBookAttrs>{
    @ApiProperty({example: '1', description: 'id book'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'The fourth wing', description: 'Name book'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: '673', description: 'Pages book'})
    @Column({type: DataType.INTEGER, allowNull: false})
    pages: number;

    @ApiProperty({example: '1000', description: 'price book'})
    @Column({type: DataType.INTEGER, allowNull: false})
    price: number;

    @ApiProperty({example: '15', description: 'Quantity book'})
    @Column({type: DataType.INTEGER, allowNull: false})
    units_in_stock: number;

    @ApiProperty({example: '2024', description: 'Release year'})
    @Column({type: DataType.INTEGER, allowNull: false})
    year_of_release: number;

    @ApiProperty({example: 'Fantasy', description: 'Genre book'})
    @Column({type: DataType.STRING, allowNull: false})
    genre: string;

    @ApiProperty({type: () => [User], description: 'User'})
    @BelongsToMany(() => User, () => OrderUserBook)
    users: User[];

    @ApiProperty({type: () => [Author], description: 'Author'})
    @BelongsToMany(() => Author, () => BookAuthor)
    authors: Author[];

    @ApiProperty({type: () => [Comment], description: 'Comment'})
    @HasMany(() => Comment)
    comments: Comment[];
}