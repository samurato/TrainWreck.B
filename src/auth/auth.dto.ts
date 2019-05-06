import { IsString } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}
