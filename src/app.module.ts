import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// не забываем установить локально на машине postgres. к которому в т.ч. идёт pgAdmin4
const sequelizeModule = SequelizeModule.forRoot({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432, //порт по умолчанию у Постграсса
  username: 'postgres',
  password: 'root123',
  database: 'nest-course',
  models: [],
  autoLoadModels: true, // с этим флагом севелайз создаёт таблицы в БД на основании моделей, что мы здесь создаём
});

// декораторы добавляет классу или функции новый функционал
@Module(
  // регистрируем, что использует модуль. сервисы(провайдеры), контроллеры и т.д.
  {
    controllers: [],
    providers: [],
    imports: [sequelizeModule],
  },
)
export class AppModule {}
