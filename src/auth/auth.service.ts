import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
  // инжектим сервис. т.е. добавляем возможность использовать какой-то сервис. т.к. сервис внешний, то добавляем его в Импорты в модули
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  // генерирует JWT токен, в нём зашифрована вся передаваемая информация
  private async generateToken(user: User) {
    const { email, id, roles } = user;
    const payload = { email, id, roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  // сверяет переданного пользователя с тем, что находится в БД
  private async validateUser(userDto: CreateUserDto) {
    // достаём пользователя из БД, чтобы сравнить пароли
    const user = await this.userService.getUserByEmail(userDto.email);
    // проверяем, что пароль пришедший от пользователя совпадает с тем, что хранится в БД
    const isPasswordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && isPasswordEquals) {
      return user;
    } else {
      throw new UnauthorizedException({ message: 'Неверная почта или пароль' });
    }
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    // если пользователь с такой почтой уже существует, то прокинем ошибку и вернём статус с ошибкой
    if (candidate) {
      throw new HttpException(
        'Пользователь с такой почтой уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    // хэшируем пароль // второй параметр - соль???
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }
}
