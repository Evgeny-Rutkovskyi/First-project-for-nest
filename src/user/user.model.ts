import {BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import { Token } from "./token.model";
import { OrderUserBook } from '../orders/order-user-book.model'
import { Comment } from "src/book/comment.model";
import { Role } from "src/roles/roles.model";
import { RoleUser } from "src/roles/role-user.model";
import { Book } from "src/book/book.model";
import { OrderDetail } from "src/orders/details-order.model";
import { ApiProperty } from "@nestjs/swagger";

interface CreateUsersAttrs {
    email: string,
    password: string,
    number_fon: string
}


@Table({tableName: 'users'})
export class User extends Model<User, CreateUsersAttrs>{
    @ApiProperty({example: '1', description: 'ID user'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'test@ukr.net', description: 'Email user'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '123password321', description: 'Password user'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    password: string;

    @ApiProperty({example: '400', description: 'Bonus user'})
    @Column({type: DataType.INTEGER, defaultValue: 0})
    bonus: number;

    @ApiProperty({example: '+380992692343', description: 'Number user'})
    @Column({type: DataType.STRING, allowNull: false})
    number_fon: string;

    @ApiProperty({type: () => Token, example: 'Token user'})
    @HasOne(() => Token, {onDelete: 'cascade'})
    tokens: Token;

    @ApiProperty({type: () => OrderDetail, example: 'Order detail user'})
    @HasOne(() => OrderDetail, {onDelete: 'cascade'})
    order: OrderDetail;

    @ApiProperty({type: () => [Book], example: 'Array books user'})
    @BelongsToMany(() => Book, () => OrderUserBook)
    booksUser: Book[];

    @ApiProperty({type: () => [Comment], example: 'Comment user'})
    @HasMany(() => Comment, {onDelete: 'cascade'})
    comments: Comment[];

    @ApiProperty({type: () => [Role], example: 'Role user'})
    @BelongsToMany(() => Role, () => RoleUser)
    roles: Role[];

}