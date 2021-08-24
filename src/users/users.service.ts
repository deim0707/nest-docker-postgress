import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

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
    // try-catch я добавил сам, возможно тут неуместно его использовать. хотел отлавливать ошибку, когда создают пользователя с одинаковой почтой. позже в Auth при регстрации ползователя стали прокидывать ошибку со статусом
    try {
      // тут мы обращаемся к БД, поэтому await
      const user = await this.userRepository.create(dto);
      // перед присваиванием роли - получаем её из БД
      const role = await this.rolesServices.getRoleByValue('ADMIN');
      // указываем, что роль принадлежит пользователю используя метод set
      // он позволяет перезаписать и сразу обновить поле
      await user.$set('roles', [role.id]);
      user.roles = [role]; // какой-то костыль, чтобы роли записывались не только в БД, но и в токен при создании пользователя
      return user;
    } catch ({ errors }) {
      console.error(errors);
    }
  }

  //создали функцию, которая сработает на ГЕТ по пути .../api/users
  // опция { include: { all: true } } говорит, что нужно возвращать все поля с которыми связан пользователь. в т.ч. покажет роли пользователя
  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
      include: { all: true },
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    //получаем пользователя по айди
    //findByPk find by primary key
    const user = await this.userRepository.findByPk(dto.userId);
    // получаем роль из базы данных
    const role = await this.rolesServices.getRoleByValue(dto.value);
    // если роль и пользователь найдены в БД, то добавляем пользователю роль
    if (role && user) {
      // первый ключ Поле, которое добавляем. второй - его значение
      // ранее мы использовали метод set. он инициализирует поля. с помощью add мы добавляем значение к проинициализированному полю
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }

  async ban(dto: BanUserDto) {
    //получаем пользователя по айди
    //findByPk find by primary key
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    // перезаписываем поле
    user.isBanned = true;
    user.banReason = dto.banReason;
    // функция save обновит значения в базе данных
    await user.save();
    return user;
  }
}
