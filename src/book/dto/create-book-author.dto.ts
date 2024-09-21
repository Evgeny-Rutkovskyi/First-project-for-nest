import { ApiProperty } from "@nestjs/swagger";

export class BookAuthorDto{
    @ApiProperty({example: 'Vasya', description: 'Name Author'})
    readonly nameAuthor: string;

    @ApiProperty({example: 'Petrov', description: 'Surname author'})
    readonly surname: string;

    @ApiProperty({example: 'Ukraine', description: 'Where does the author live'})
    readonly country: string;

    @ApiProperty({example: 'The fourth wild', description: 'Name book'})
    readonly nameBook: string;

    @ApiProperty({example: '673', description: 'Pages book'})
    readonly pages: number;

    @ApiProperty({example: '1000', description: 'price book'})
    readonly price: number;

    @ApiProperty({example: '15', description: 'Quantity book'})
    readonly units_in_stock: number;

    @ApiProperty({example: 'Fantasy', description: 'Genre book'})
    readonly genre: string;

    @ApiProperty({example: '2024', description: 'Release year'})
    readonly year_of_release: number
}