// dto - простой объект, который не содержит никакой логики и имеет только поля. он предназначен для обмена данными между подсистемами (например клиент-сервер или сервер-сервер)
export class CreateUserDto {
  readonly email: string;

  readonly password: string;
}
