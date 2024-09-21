import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from 'src/book/author.model';
import { Book } from 'src/book/book.model';
import { BookAuthor } from 'src/book/book_author.model';
import { Comment } from 'src/book/comment.model';
import { RoleUser } from 'src/roles/role-user.model';
import { Role } from 'src/roles/roles.model';
import { OrderDetail } from 'src/orders/details-order.model';
import { OrderUserBook } from 'src/orders/order-user-book.model';
import { Token } from 'src/user/token.model';
import { User } from 'src/user/user.model';

@Module({
    imports: [SequelizeModule.forFeature([User, Token, OrderDetail, Book, Author, OrderUserBook, Comment, BookAuthor, Role, RoleUser])],
    exports: [SequelizeModule]
})
export class DatabaseModule {}
