import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './book.model';
import { Author } from './author.model';
import { BookDto } from './dto/create-book.dto';
import { AuthorDto } from './dto/create-author.dto';
import { CommentDto } from './dto/add-comment.dto';
import { Comment } from './comment.model';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book) private bookRepository: typeof Book,
    @InjectModel(Author) private authorRepository: typeof Author,
    @InjectModel(Comment) private commentRepository: typeof Comment) {}

    async addBookAdmin(bookDto: BookDto){
        try{    
            const [book, created] = await this.bookRepository.findOrCreate({
                where: {name: bookDto.nameBook},
                defaults: {...bookDto}
            });
            if(!created){
                throw new BadRequestException('Дана книга вже існує в продажі');
            }
            const [author, createdAuthor] = await this.authorRepository.findOrCreate({
                where: {name: bookDto.author_name},
                defaults: {name: bookDto.author_name, surname: bookDto.author_surname}
            });
            await book.$add('authors', author.id);
            return book;
        }catch (e) {
            console.log('addBookAdminMethod -', e);
            throw new InternalServerErrorException('Server error');
        }

    }

    async addSecondAuthorForBookAdmin(authorDto: AuthorDto){
        try{
            const [author, created] = await this.authorRepository.findOrCreate({
                where: {name: authorDto.name},
                defaults: {...authorDto}
            });
            const book = await this.bookRepository.findOne({where: {name: authorDto.book_name}});
            if(!book){
                throw new NotFoundException('Не було знайдено дану книгу');
            }
            await book.$add('authors', author.id);
            return {book, author};
        }catch (e) {
            console.log('addSecondAuthorForBookAdminMethod -', e);
            throw new InternalServerErrorException('Server error');   
        }   
    }

    
    async addCommentForBook(commentDto: CommentDto, idBook: number){
        try {
            const comment = await this.commentRepository.create({
                id_book: idBook,
                id_user: commentDto.id_user,
                comment: commentDto.comment
            })
            return comment;
        } catch (e) {
            console.log('addCommentForBookMethod -', e);
            throw new InternalServerErrorException('Server error'); 
        }
    }

    async getAllBook(){
        try{
            const allBooksInfo = await this.bookRepository.findAll({
                include: [{model: Author}, {model: Comment}]
            });
            return allBooksInfo;
        }catch (e) {
            console.log('getAllBookMethod -', e);
            throw new InternalServerErrorException('Server error'); 
        }
    }

    async getBookById(idBook: number){
        try {
            const book = await this.bookRepository.findByPk(idBook, {
                include: [{model: Author}, {model: Comment}]}
            );
            if(!book){
                throw new NotFoundException('Не було знайдено дану книгу');
            }
            return book;
        } catch (e) {
            console.log('getBookByIdMethod -', e);
            throw new InternalServerErrorException('Server error'); 
        }
    }

    async getBookByAuthor(author){
        try{
            const [name, surname] = author.split(' ');
            const bookWithAuthor = await this.authorRepository.findAll({
                where: {name, surname},
                include: [{model: Author}, {model: Comment}]
            })
            if(!bookWithAuthor){
                throw new NotFoundException('Не було знайдено жодної книги за цим автором');
            }
            return bookWithAuthor;
        }catch (e) {
            console.log('getBookByAuthorMethod -', e);
            throw new InternalServerErrorException('Server error');
        }
    }

    async getBookByGenre(genre: string){
        try {
            const book = await this.bookRepository.findAll({
                where: {genre},
                include: [{model: Author}, {model: Comment}]
            });
            if(!book){
                throw new NotFoundException('Не було знайдено жодної книги за цим жанром');
            }
            return book;
        } catch (e) {
            console.log('getBookByGenreMethod -', e);
            throw new InternalServerErrorException('Server error');
        }
    }

    async getBookByName(bookName: string){
        try {
            const bookData = await this.bookRepository.findAll({
                where: {name: bookName},
                include: [{model: Author}, {model: Comment}]
            });
            if(!bookData){
                throw new NotFoundException('Не було знайдено жодної книги за даною назвою');
            }
            return bookData;
        } catch (e) {
            console.log('getBookByNameMethod -', e);
            throw new InternalServerErrorException('Server error');
        }
    }


    async getAllAuthors(){
        try {
            const allAuthors = await this.authorRepository.findAll();
            return allAuthors;
        } catch (e) {
            console.log('getAllAuthorsMethod -', e);
            throw new InternalServerErrorException('Server error');
        }
    }


    async getAuthorById(idAuthor: number){
        try{
            const author = await this.authorRepository.findByPk(idAuthor);
            if(!author){
                throw new NotFoundException('Автора не знайдено');
            }
            return author;
        }catch (e) {
            console.log('getAuthorByIdMethod -', e);
            throw new InternalServerErrorException('Server error');
        }
    }
    
}
