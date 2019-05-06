import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UserRole } from './user.entity';
import { UsersService } from './users.service';
import { UsersRegisterDto } from './users.dto';

@Controller('users')
export class UsersPrivateController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  // @Roles(UserRole.ADMIN)
  public async register(
    // @UserDecor() viewer: IUser,
    @Body() user: UsersRegisterDto,
  ) {
    const {email, password, role} = user;
    return await this.usersService.create({email, password, role});
  }

  @Get('/:userId')
  public async getUser(
    @Param('userId') userId: string,
  ) {
    return await this.usersService.get(userId);
  }
}
