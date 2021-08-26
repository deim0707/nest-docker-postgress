import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';

interface PostCreationAttributes {
  title: string;
  content: string;
  userId: number;
  image: string;
}

//декоратор делает таблицей в БД
@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttributes> {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор пользователя',
  })
  // декоратор делает колонками в таблице
  @Column({
    type: DataType.INTEGER, // тип поля - числовой
    unique: true, // поле всегда ункиально
    autoIncrement: true, // с каждой записью будет инкрементироваться (1,2,3,4...)
    primaryKey: true, // первичный ключ // что это значит???
  })
  id: number;

  @ApiProperty({
    example: 'Лучшая статья номер 1',
    description: 'Заголовок статьи',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false, // не может быть пустым
  })
  title: string;

  @ApiProperty({
    example: 'lorem100',
    description: 'Основной текст статьи',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  @ApiProperty({
    example: '...',
    description: 'Изображение',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  // в колбеке указываем, на какую модель внешний ключ ссылается
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
  //тип связи: один ко многим. то есть один пользователь может иметь много постов
  // сделали здесь связь. не забываем пойти в пользователя и обозначить связь там с этой таблицей
  @BelongsTo(() => User)
  author: User;
}
