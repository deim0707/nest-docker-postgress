import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

// цель данного гварда не предоставлять список пользователей - если текущий пользователь не авторизован
// проверяет в Хедере запроса поле Authorization: "Bearer _ТОКЕН_"

@Injectable() // без этого декоратора переданные в конструктор сущности не смогут быть использованы
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  // когда доступ разрешён - функция возврщает Тру, когда запрещен - Фолс
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // получаем объект Реквеста из Контекста
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;
      // тип токена:
      const bearer = authHeader.split(' ')[0];
      // сам токен
      const token = authHeader.split(' ')[1];

      console.log({ bearer, token });

      if (bearer !== 'Bearer' && !token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }

      // разкодируем токен
      const user = this.jwtService.verify(token);
      // после разкодирования помещаем пользователя в реквест
      req.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException({
        message: `Пользователь не авторизован. Ошибка: ${e}`,
      });
    }
  }
}
