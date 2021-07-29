import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';

//ниже происходит та сама ИНЪЕКЦИЯ Сервиса в Контроллер. благодаря этому нам не нужено создавать объект из класса Сервиса
@Injectable() // внедрение Сервиса в Контроллер - инъекция
export class UsersService {
  //@InjectModel(User) - внедряем модель
  //даём ей имя в этой области видимости - userRepository и указываем её тип
  constructor(@InjectModel(User) private userRepository: typeof User) {}
  async createUser(dto: CreateUserDto) {
    // тут мы обращаемся к БД, поэтому await
    const user = await this.userRepository.create(dto);
    return user;
  }

  //создали функцию, которая сработает на ГЕТ по пути .../api/users
  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }
}
