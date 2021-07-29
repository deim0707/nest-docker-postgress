import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';

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
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }
}
