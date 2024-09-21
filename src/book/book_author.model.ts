import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Author } from "./author.model";
import { Book } from "./book.model";
import { ApiProperty } from "@nestjs/swagger";


@Table({tableName: 'book_author'})
export class BookAuthor extends Model<BookAuthor>{
    @ApiProperty({example: '1', description: 'id connected table'})
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '1', description: 'FK, connected table'})
    @ForeignKey(() => Author)
    @Column({type: DataType.INTEGER, allowNull: false})
    id_Author: number;

    @ApiProperty({example: '1', description: 'FK, connected table'})
    @ForeignKey(() => Book)
    @Column({type: DataType.INTEGER, allowNull: false})
    id_Book: number;
}