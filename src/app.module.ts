import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// декораторы добавляет классу или функции новый функционал
@Module(
  // регистрируем, что использует модуль. сервисы(провайдеры), контроллеры и т.д.
  {
    controllers: [AppController],
    providers: [AppService],
  },
)
export class AppModule {}
