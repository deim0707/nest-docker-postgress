import { ApiProperty } from '@nestjs/swagger';

// dto - простой объект, который не содержит никакой логики и имеет только поля. он предназначен для обмена данными между подсистемами (например клиент-сервер или сервер-сервер)

export class CreateUserDto {
  //@ApiProperty -  описываем поля для свагера. будут отображаться в примере Ответа
  @ApiProperty({
    example: 'вася@почта.рф',
    description: 'Элеткронная почта пользователя',
  })
  readonly email: string;

  @ApiProperty({
    example: '09713h1kjb',
    description: 'Пароль',
  })
  readonly password: string;
}
