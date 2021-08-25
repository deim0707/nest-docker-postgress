import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

// назначение Пайпа - преобразовывание данных, например строку переводить в число; валидация входных данных.
// правила навешиваем на DTO
// этот пайп не привязан к конкретному типу данных. он универсален и смотрит ДТО
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    // получаем валидируемый объект
    // plainToClass - преобразовывает значение в нужный для нас класс
    const obj = plainToClass(metadata.metatype, value);
    // errors = ошибки которые получены при валидации объекта
    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.map((err) => {
        return `${err.property} - ${Object.values(err.constraints).join('; ')}`;
      });
      throw new ValidationException(messages);
    }

    return value;
  }
}
