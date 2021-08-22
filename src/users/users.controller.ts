import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Users, Пользователи')
//контроллер содержит ендпоинты. дёргает сервис где находится логика
@Controller('users')
export class UsersController {
  //private usersService: UsersService - инжектим сервис
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' }) // @ApiOperation позволяет добавлять документацию в сваггер
  @ApiResponse({ status: 200, type: User }) // какой статус и данные вернёт. // не забываем задокументировать в файле модели: { User } from './users.model';
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  // @UseGuards(JwtAuthGuard) // написаный нами гвард, который предотвращает использования незалогененых пользователей
  // наш самодельный декоратор в котором указываем для каких ролей будет доступен ендпоинт:
  @Roles('ADMINss')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }
}
