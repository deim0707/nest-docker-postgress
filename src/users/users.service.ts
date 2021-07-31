import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';

//ниже происходит та сама ИНЪЕКЦИЯ Сервиса в Контроллер. благодаря этому нам не нужено создавать объект из класса Сервиса
@Injectable() // внедрение Сервиса в Контроллер - инъекция
export class UsersService {
  //@InjectModel(User) - внедряем модель
  //даём ей имя в этой области видимости - userRepository и указываем её тип
  // внедряем 2 модели
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private rolesServices: RolesService,
  ) {}
  async createUser(dto: CreateUserDto) {
    // тут мы обращаемся к БД, поэтому await
    const user = await this.userRepository.create(dto);
    // перед присваиванием роли - получаем её из БД
    const role = await this.rolesServices.getRoleByValue('USER');
    // указываем, что роль принадлежит пользователю используя метод set
    // он позволяет перезаписать и сразу обновить поле
    await user.$set('roles', [role.id]);
    return user;
  }

  //создали функцию, которая сработает на ГЕТ по пути .../api/users
  // опция { include: { all: true } } говорит, что нужно возвращать все поля с которыми связан пользователь
  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }
}
