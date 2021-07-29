import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

// какие поля будут нужны для СОЗДАНИЯ экземпляра этого класса
interface RoleCreationAttributes {
  value: string;
  description: string;
}

//декоратор делает таблицей в БД
@Table({ tableName: 'roles' })
// первый интерфейс переданный в дженерик - какие поля присущи сузности. второй интерфейс - какие поля нужны при создании
export class Role extends Model<Role, RoleCreationAttributes> {
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
    primaryKey: true, // первичный ключ
  })
  id: number;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Уникальная роль пользователя',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false, // не может быть пустым
  })
  value: string;

  @ApiProperty({
    example: 'Администратор',
    description: 'Описание роли',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;
}
