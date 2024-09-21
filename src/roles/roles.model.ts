import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import { User } from "src/user/user.model";
import { RoleUser } from "./role-user.model";
import { ApiProperty } from "@nestjs/swagger";

interface roleAttrs{
    value: string;
    description: string;
}


@Table({tableName: 'role', createdAt: false, updatedAt: false})
export class Role extends Model<Role, roleAttrs>{
    @ApiProperty({example: '1', description: 'ID role'})
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
    id: number;

    @ApiProperty({example: 'ADMIN', description: 'Name role'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @ApiProperty({example: 'Can add/delete books', description: 'information about role capabilities'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @ApiProperty({type: () => [User], description: 'Array user, who have these roles'})
    @BelongsToMany(() => User, () => RoleUser)
    users: User[];
}