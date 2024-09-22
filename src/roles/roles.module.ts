import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('SECRET_KEY'),
      signOptions: { expiresIn: '24h' },
    }),
  })],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService]
})
export class RolesModule {}
