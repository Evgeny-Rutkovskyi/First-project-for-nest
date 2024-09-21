import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { DatabaseModule } from 'src/database/database.module';
import { JwtGuard } from './jwt-auth.guard';

@Module({
  imports: [JwtModule.register({
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: '24h' },
  }), forwardRef(() => UserModule), DatabaseModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
