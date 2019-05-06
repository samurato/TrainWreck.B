import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { AuthLoginDto } from './auth.dto';
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  public async login(
    @Body() body: AuthLoginDto,
  ) {
    const user = await this.authService.validateCredentials(body);
    if (!user) {
      throw new UnauthorizedException();
    }
    const token = await this.authService.createToken(user.id);
    return {...token, user};
  }

  // public async login(@Body() body: AuthLoginDto) {
  //   const user = await this.authService.validateCredentials(body as IUser);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   const token = await this.authService.createToken(user);
  //   return {...token, user};
  // }
}
