import { IsString } from 'class-validator';

export class UsersRegisterDto {
  @IsString()
  public readonly email: string;

  @IsString()
  public readonly password: string;

  @IsString()
  public readonly role: string;
}
