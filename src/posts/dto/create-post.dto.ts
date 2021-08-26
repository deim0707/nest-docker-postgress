export class CreatePostDto {
  readonly title: string;

  readonly content: string;

  readonly userId: number; // в хорошей архитектуре мы доставали бы айди пользователя из токена. тут упрощённый вариант
}
