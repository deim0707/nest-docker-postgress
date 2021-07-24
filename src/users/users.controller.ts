import { Controller } from '@nestjs/common';

//контроллер содержит ендпоинты. дёргает сервис где находится логика
@Controller('users')
//ниже происходит та сама ИНЪЕКЦИЯ Сервиса в Контроллер. благодаря этому нам не нужено создавать объект из класса Сервиса
export class UsersController {}
//создали функцию, которая сработает на ГЕТ по пути .../api/users
