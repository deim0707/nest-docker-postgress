import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRoles } from '../roles/user-roles.model';
import { User } from './users.model';
import { Role } from '../roles/roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    // ниже добавили используемые в модуле Модели
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RolesModule, // чтобы получить возможность импортировать здесь модуль (откуда нам нужен Сервис) - добавляем его в Экспорты в этом модуле
    forwardRef(() => AuthModule), // forwardRef - костыль (?) от циклической зависимости
  ],
  exports: [
    UsersService, // чтобы получить возможность обратиться к ЮзерСервису в модуле Auth (авторизация)
  ],
})
export class UsersModule {}
