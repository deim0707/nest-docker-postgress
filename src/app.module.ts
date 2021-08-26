import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { Role } from './roles/roles.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/post.modele';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

// не забываем установить локально на машине postgres. к которому в т.ч. идёт pgAdmin4

// декораторы добавляют классу или функции новый функционал
@Module(
  // регистрируем, что использует модуль. сервисы(провайдеры), контроллеры и т.д. // в данном случае импортируем другие модули, где уже указаны сервисы/контроллеры
  {
    controllers: [],
    providers: [],
    imports: [
      // process.env.NODE_ENV задаём при запуске в скрипте package
      ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
      // учим сервер раздавать статику. в нашем случае он будет возвращать по пути картику картинку в браузере
      ServeStaticModule.forRoot({
        rootPath: path.resolve(__dirname, 'static'),
      }),
      // настройка БД, т.е. ОРМ (sequelize) - системы, при помощи которой работают с БД
      SequelizeModule.forRoot({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT), //порт по умолчанию у Постграсса
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        models: [User, Role, UserRoles, Post], //  регистрируем модель для БД
        autoLoadModels: true, // с этим флагом секвелайз создаёт таблицы в БД на основании моделей, что мы здесь создаём
      }),
      UsersModule,
      RolesModule,
      AuthModule,
      PostsModule,
      FilesModule,
    ],
  },
)
export class AppModule {}
