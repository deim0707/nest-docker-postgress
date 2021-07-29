import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

//контроллер содержит ендпоинты. дёргает сервис где находится логика
@Controller('users')
export class UsersController {
  //private usersService: UsersService - инжектим сервис
  constructor(private usersService: UsersService) {}
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }
}
