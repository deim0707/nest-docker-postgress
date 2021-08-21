import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Аавторизация')
@Controller('auth')
export class AuthController {
  // инжектим сервис. т.е. добавляем возможность использовать какой-то сервис
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    console.log(333, userDto);
    return this.authService.registration(userDto);
  }
}
