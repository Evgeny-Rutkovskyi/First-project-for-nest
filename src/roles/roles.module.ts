import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, JwtModule.register({
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: '24h' },
  })],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService]
})
export class RolesModule {}
