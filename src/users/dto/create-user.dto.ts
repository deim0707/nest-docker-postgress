import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

// dto - простой объект, который не содержит никакой логики и имеет только поля. он предназначен для обмена данными между подсистемами (например клиент-сервер или сервер-сервер)

export class CreateUserDto {
  //@ApiProperty -  описываем поля для свагера. будут отображаться в примере Ответа
  @ApiProperty({
    example: 'вася@почта.рф',
    description: 'Элеткронная почта пользователя',
  })
  //@IsString проводим валидацию данных. будет задействован пайп
  @IsString({ message: 'Поле должно быть строкой' })
  // валидация, что соответствует регулярки электронной почты
  @IsEmail({}, { message: 'Должен быть валидной электронной почтой' })
  readonly email: string;

  @ApiProperty({
    example: '09713h1kjb',
    description: 'Пароль',
  })
  @IsString({ message: 'Поле должно быть строкой' })
  //@Length - так же валидация
  @Length(4, 16, { message: 'Не меньше 4 и не боль16 знаков для пароля' })
  readonly password: string;
}
