import { ApiProperty } from "@nestjs/swagger";

export class AddRole{
    @ApiProperty({example: 'ADMIN', description: 'New role for user'})
    readonly value: string;

    @ApiProperty({example: '1', description: 'ID user'})
    readonly id_user: number
}