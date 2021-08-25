import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'Должно быть строкой' })
  readonly value: string; //название роли

  @IsNumber({}, { message: 'Должно быть числом' })
  readonly userId: number; // айди какому ползьователю
}
