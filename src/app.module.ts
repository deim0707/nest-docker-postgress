import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { User } from './users/users.model';
import { Role } from './roles/roles.model';

// не забываем установить локально на машине postgres. к которому в т.ч. идёт pgAdmin4

// декораторы добавляет классу или функции новый функционал
@Module(
  // регистрируем, что использует модуль. сервисы(провайдеры), контроллеры и т.д.
  {
    controllers: [],
    providers: [],
    imports: [
      // process.env.NODE_ENV задаём при запуске в скрипте package
      ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
      SequelizeModule.forRoot({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT), //порт по умолчанию у Постграсса
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        models: [User, Role], //  регистрируем модель для БД
        autoLoadModels: true, // с этим флагом севелайз создаёт таблицы в БД на основании моделей, что мы здесь создаём
      }),
      UsersModule,
      RolesModule,
    ],
  },
)
export class AppModule {}
