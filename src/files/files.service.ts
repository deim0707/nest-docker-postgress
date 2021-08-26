import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  // файл запишется в dist/static
  async createFile(file): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');
      //проверка, если по этому пути ничего не существует
      if (!fs.existsSync(filePath)) {
        // тогда создаём папку
        // recursive: true - создаст папку если на любом участке пути чего-то не хватает. т.е. может создать несколько вложенных папок
        fs.mkdirSync(filePath, { recursive: true });
      }
      // записываем файл по уже точно существующему пути в файловую систему
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      return fileName;
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
