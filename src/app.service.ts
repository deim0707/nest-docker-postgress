import { Injectable } from '@nestjs/common';

@Injectable() // внедрение Сервиса в Контроллер - инъекция
export class AppService {
  getUsers() {
    return [{ id: 123, name: 'Dima' }];
  }
}
