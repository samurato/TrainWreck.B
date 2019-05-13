import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDecor } from '../utils/common/user.decorator';
import { IUser } from '../users/user.entity';

@Controller('auth')
export class AuthPrivateController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('/extend')
  public async extend(
    @UserDecor() viewer: Partial<IUser>,
  ) {
    const token = await this.authService.createToken(viewer.User_ID);
    return {...token};
  }
}
