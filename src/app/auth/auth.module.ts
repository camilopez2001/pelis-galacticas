import { Module } from '@nestjs/common';
import { AuthConfig } from './auth.config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserEntity } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserEntity]),
    UserModule
  ],
  providers: [AuthService, JwtStrategy, AuthConfig],
  exports: [AuthService, JwtStrategy, AuthConfig],
  controllers: [AuthController],
})
export class AuthModule { }