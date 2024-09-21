import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { BookModule } from 'src/book/book.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule), BookModule, JwtModule.register({
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: '24h' },
  })],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
