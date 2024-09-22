import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { Token } from './user/token.model';
import { Book } from './book/book.model';
import { Author } from './book/author.model';
import { DatabaseModule } from './database/database.module';
import { Comment } from './book/comment.model';
import { BookAuthor } from './book/book_author.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { RoleUser } from './roles/role-user.model';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { OrderUserBook } from './orders/order-user-book.model';
import { OrderDetail } from './orders/details-order.model';


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`,
  }),SequelizeModule.forRoot({
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE_NAME,
    models: [User, Token, Book, Author, Comment, BookAuthor, Role, RoleUser, OrderUserBook, OrderDetail],
    autoLoadModels: true
  }),
  UserModule, BookModule, DatabaseModule, RolesModule, AuthModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}


