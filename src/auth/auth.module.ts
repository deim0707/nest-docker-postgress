import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    // импортируем чтобы получить доступ к нему в контроллере из этого модуля
    // forwardRef - костыль(?) от циклической связи между авторизацией и пользователем
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'random-secret-key',
      signOptions: {
        expiresIn: '24h',
      }, // время жизни токена // токен будет жить 24 часа
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
