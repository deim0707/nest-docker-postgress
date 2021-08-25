import { HttpException, HttpStatus } from '@nestjs/common';

// сделали кастомный эксепшен используя существующий библиотечный класс

export class ValidationException extends HttpException {
  // добавляем к классу от которого насследовались ещё одно поле
  messages;

  constructor(response) {
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}
