import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports: [forwardRef(() => AuthModule), DatabaseModule, RolesModule, JwtModule.register({
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: '24h' },
  })],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
