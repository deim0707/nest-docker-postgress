import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiTags('Users, Пользователи')
//контроллер содержит ендпоинты. дёргает сервис где находится логика
@Controller('users')
export class UsersController {
  //private usersService: UsersService - инжектим сервис
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' }) // @ApiOperation позволяет добавлять документацию в сваггер
  @ApiResponse({ status: 200, type: User }) // какой статус и данные вернёт. // не забываем задокументировать в файле модели: { User } from './users.model';
  // делаем валидацию пайпом
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  // @UseGuards(JwtAuthGuard) // написаный нами гвард, который предотвращает использования незалогененых пользователей
  // наш самодельный декоратор в котором указываем для каких ролей будет доступен ендпоинт:
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Выдача ролей' })
  @ApiResponse({ status: 200 })
  // @UseGuards(JwtAuthGuard) // написаный нами гвард, который предотвращает использования незалогененых пользователей
  // наш самодельный декоратор в котором указываем для каких ролей будет доступен ендпоинт:
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  // @Body позволяет нам указать, что при запросе будет передан параметр
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({ summary: 'Выдача банов' })
  @ApiResponse({ status: 200 })
  // @UseGuards(JwtAuthGuard) // написаный нами гвард, который предотвращает использования незалогененых пользователей
  // наш самодельный декоратор в котором указываем для каких ролей будет доступен ендпоинт:
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  // @Body позволяет нам указать, что при запросе будет передан параметр
  ban(@Body() dto: BanUserDto) {
    return this.usersService.ban(dto);
  }
}
