import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { Post } from '../posts/post.modele';

// какие поля будут нужны для СОЗДАНИЯ экземпляра этого класса
interface UserCreationAttributes {
  email: string;
  password: string;
}

//декоратор делает таблицей в БД
@Table({ tableName: 'users' })
// первый интерфейс переданный в дженерик - какие поля присущи сущности. второй интерфейс - какие поля нужны при создании
export class User extends Model<User, UserCreationAttributes> {
  //@ApiProperty -  описываем поля для свагера. будут отображаться в примере Ответа
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
    example: 'user@mail.com',
    description: 'Электронная почта пользователя',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false, // не может быть пустым
  })
  email: string;

  @ApiProperty({
    example: '23fsdf4444as2',
    description: 'Пароль',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: false,
    description: 'Заблокирован ли пользователь в приложении',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false, // значение по умолчанию
  })
  isBanned: boolean;

  @ApiProperty({
    example: 'За хулиганство',
    description: 'Причина блокировки',
  })
  @Column({
    // ранее тут было прописано INTEGER. для изменения в БД на стринг необходима миграция
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;

  // реализуем связь между таблицей Ролей и Пользователей. связь много ко многим
  // первый аргумент: с какой сущностью связываем. второй: через какую таблицу это делаем
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Post)
  posts: Post[];
}
