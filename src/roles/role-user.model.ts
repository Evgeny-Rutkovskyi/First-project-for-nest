import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";
import { Role } from "./roles.model";
import { ApiProperty } from "@nestjs/swagger";


@Table({tableName: 'roleuser'})
export class RoleUser extends Model<RoleUser>{
    @ApiProperty({example: '1', description: 'ID role user'})
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '1', description: 'FK, ID user'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    id_user: number;

    @ApiProperty({example: '1', description: 'FK, ID role'})
    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER, allowNull: false})
    id_role: number;
}

