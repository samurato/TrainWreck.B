import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {

  @Post('/login')
  public async login(
    @Body() body: AuthLoginDto,
  ) {
    return "helo";
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
