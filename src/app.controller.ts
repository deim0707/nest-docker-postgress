import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//контроллер содержит ендпоинты. дёргает сервис где находится логика
@Controller('/api')
export class AppController {
  //ниже происходит та сама ИНЪЕКЦИЯ Сервиса в Контроллер. благодаря этому нам не нужено создавать объект из класса Сервиса
  constructor(private appService: AppService) {}

  //создали функцию, которая сработает на ГЕТ по пути .../api/users
  @Get('/users')
  getUsers() {
    return this.appService.getUsers();
  }
}
