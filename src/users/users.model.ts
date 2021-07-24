import { Column, DataType, Model, Table } from 'sequelize-typescript';

// какие поля будут нужны для создания экземпляра этого класса
interface UserCreationAttributes {
  email: string;
  password: string;
}

//декоратор делает таблицей в БД
@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  // декоратор делает колонками в таблице
  @Column({
    type: DataType.INTEGER, // тип поля - числовой
    unique: true, // поле всегда ункиально
    autoIncrement: true, // с каждой записью будет инкрементироваться (1,2,3,4...)
    primaryKey: true, // первичный ключ
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false, // не может быть пустым
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false, // значение по умолчанию
  })
  isBanned: boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  banReason: string;
}
