import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, AuthModule, JwtModule.register({
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: '24h' },
  })],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService]
})
export class BookModule {}
