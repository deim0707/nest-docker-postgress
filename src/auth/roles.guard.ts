import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable() // без этого декоратора переданные в конструктор сущности не смогут быть использованы
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  // когда доступ разрешён - функция возврщает Тру, когда запрещен - Фолс
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      // второй аргумент помогает понять рефелктору какие данные необходимо доставать
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }
      // получаем объект Реквеста из Контекста
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      // тип токена:
      const bearer = authHeader.split(' ')[0];
      // сам токен
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' && !token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }

      // разкодируем токен
      const user = this.jwtService.verify(token);
      // после разкодирования помещаем пользователя в реквест
      req.user = user;
      // есть у пользователя необходимая для этого эндпоинта роль. возвращает - тру/фолс
      return user.roles.some((role) => requiredRoles.includes(role.value));
    } catch (e) {
      throw new HttpException(
        `Нет доступа. Ошибка: ${e}`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
