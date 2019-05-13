import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UserRole, IUser } from './user.entity';
import { UsersService } from './users.service';
import { UsersRegisterDto } from './users.dto';
import { Roles } from 'src/utils/common/roles';
import { UserDecor } from 'src/utils/common/user.decorator';

@Controller('users')
export class UsersPrivateController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/get/:userId')
  public async getUser(
    @Param('userId') userId: string,
  ) {
    return await this.usersService.get(userId);
  }
}
