import { ApiProperty } from "@nestjs/swagger";

export class RoleDto{
    @ApiProperty({example: 'USER', description: 'Name role'})
    value: string;

    @ApiProperty({example: 'Can by book', description: 'information about role capabilities'})
    description: string;
}