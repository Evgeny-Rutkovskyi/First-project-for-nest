import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { ApiProperty } from "@nestjs/swagger";

interface CreateTokensAttrs{
    token: string,
    id_user: number
}

@Table({tableName: 'tokens'})
export class Token extends Model<Token, CreateTokensAttrs>{
    @ApiProperty({example: '1', description: 'ID token'})
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '2', description: 'FK, ID user'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, unique: true})
    id_user: number;

    @ApiProperty({example: 'WDJF21F13FW...', description: 'Token'})
    @Column({type: DataType.STRING, allowNull: false})
    token: string;

    @ApiProperty({type: () => User, description: 'User'})
    @BelongsTo(() => User)
    user: User;
}