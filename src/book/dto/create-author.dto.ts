import { ApiProperty } from "@nestjs/swagger";

export class AuthorDto{
    @ApiProperty({example: 'Vasya', description: 'Name Author'})
    readonly name: string;

    @ApiProperty({example: 'Petrov', description: 'Surname author'})
    readonly surname: string;

    @ApiProperty({example: 'Ukraine', description: 'Where does the author live'})
    readonly country?: string;

    @ApiProperty({example: 'The fourth wild', description: 'Name book'})
    readonly book_name: string
}