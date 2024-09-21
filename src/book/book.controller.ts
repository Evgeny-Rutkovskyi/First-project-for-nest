import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './dto/create-book.dto';
import { AuthorDto } from './dto/create-author.dto';
import { CommentDto } from './dto/add-comment.dto';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book } from './book.model';
import { Author } from './author.model';

@ApiTags('Book')
@Controller('book')
export class BookController {

    constructor(private readonly bookService: BookService) {}

    @ApiOperation({summary: 'Додає книгу до товару'})
    @ApiBearerAuth('Token')
    @ApiBody({type: BookDto})
    @ApiResponse({status: 200, type: Book})
    @ApiResponse({status: 400, description: 'BadRequestException, Книга вже наявна в продажі'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @UseGuards(JwtGuard)
    @Roles('ADMIN')
    @Post('/add/admin')
    addBookAdmin(@Body() bookDto: BookDto){
        return this.bookService.addBookAdmin(bookDto);
    }

    @ApiOperation({summary: 'Додає автора до книги'})
    @ApiBearerAuth('Token')
    @ApiBody({type: AuthorDto})
    @ApiResponse({status: 200, type: Object})
    @ApiResponse({status: 404, description: 'NotFoundException, Not book exist'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @UseGuards(JwtGuard)
    @Roles('ADMIN')
    @Post('/add/author/admin')
    addSecondAuthorForBookAdmin(@Body() authorDto: AuthorDto){
        return this.bookService.addSecondAuthorForBookAdmin(authorDto);
    }

    @ApiOperation({summary: 'Додає комент до книги'})
    @ApiBearerAuth('Token')
    @ApiBody({type: CommentDto})
    @ApiParam({name: 'idBook', type: Number, description: 'id Book'})
    @ApiResponse({status: 200, type: CommentDto})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @UseGuards(JwtGuard)
    @Post('/comment/:idBook')
    addComment(@Body() commentDto: CommentDto, @Param('idBook') idBook: number){
        return this.bookService.addCommentForBook(commentDto, idBook);
    }

    @ApiOperation({summary: 'Повертає всі книги'})
    @ApiResponse({status: 200, type: Book})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @Get('/book/all')
    getAllBook(){
        return this.bookService.getAllBook();
    }

    @ApiOperation({summary: 'Get book by id'})
    @ApiParam({name: 'id', type: Number, description: 'id book'})
    @ApiResponse({status: 200, type: Book})
    @ApiResponse({status: 404, description: 'NotFoundException, Not book exist'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @Get('/book/:id')
    getBookById(@Param('id') id: number){
        return this.bookService.getBookById(id);
    }

    @ApiOperation({summary: 'Get book by author'})
    @ApiBody({type: String})
    @ApiResponse({status: 200, type: Object})
    @ApiResponse({status: 404, description: 'NotFoundException, Not book exist by author'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @Get('/book/author')
    getBookByAuthor(@Body('author') author: string){
        return this.bookService.getBookByAuthor(author);
    }

    @ApiOperation({summary: 'Get book by genre'})
    @ApiBody({type: String})
    @ApiResponse({status: 200, type: Book})
    @ApiResponse({status: 404, description: 'NotFoundException, Not book exist by genre'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @Get('/book/genre')
    getBookByGenre(@Body('genre') genre: string){
        return this.bookService.getBookByGenre(genre);
    }

    @ApiOperation({summary: 'Get book by name'})
    @ApiBody({type: String})
    @ApiResponse({status: 200, type: Book})
    @ApiResponse({status: 404, description: 'NotFoundException, Not book exist by name'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @Get('/book/name')
    getBookByName(@Body('name') name: string){
        return this.bookService.getBookByName(name);
    }

    @ApiOperation({summary: 'Get all authors'})
    @ApiResponse({status: 200, type: Author})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @Get('/book/authors')
    getAllAuthors(){
        return this.bookService.getAllAuthors();
    }

    @ApiOperation({summary: 'Get author by id'})
    @ApiParam({name: 'id', type: Number, description: 'id Author'})
    @ApiResponse({status: 200, type: Author})
    @ApiResponse({status: 404, description: 'NotFoundException, Not author exist by id'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @Get('/book/:id')
    getAuthorById(@Param('id') id: number){
        return this.bookService.getAuthorById(id);
    }
}
