import { ApiProperty } from "@nestjs/swagger";

export class CommentDto{
    @ApiProperty({example: '1', description: 'id user'})
    readonly id_user: number;

    @ApiProperty({example: 'Some comment', description: 'Comment'})
    readonly comment: string
}