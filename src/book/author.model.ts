import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Book } from "./book.model";
import { BookAuthor } from "./book_author.model";
import { ApiProperty } from "@nestjs/swagger";

interface CreateAuthorAttrs{
    name: string,
    surname: string,
    country: string
}

@Table({tableName: 'authors'})
export class Author extends Model<Author, CreateAuthorAttrs>{
    @ApiProperty({example: '1', description: 'id author'})
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Vasya', description: 'Name author'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: 'Petrov', description: 'Surname author'})
    @Column({type: DataType.STRING, allowNull: false})
    surname: string;

    @ApiProperty({example: 'Ukraine', description: 'Where does the author live'})
    @Column({type: DataType.STRING})
    country: string;

    @ApiProperty({type: () => [Book], description: 'Books written by the author'})
    @BelongsToMany(() => Book, () => BookAuthor)
    booksAuthor: Book[];
}