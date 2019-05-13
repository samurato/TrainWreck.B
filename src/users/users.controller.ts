import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { Roles } from '../utils/common/roles';
import { GetUserRole, UserRole } from './user.entity';
import { UsersRegisterDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  // TODO: move to private
  @Post('/register')
  @Roles(UserRole.ADMIN)
  public async register(
    // @UserDecor() viewer: Partial<IUser>,
    @Body() user: UsersRegisterDto,
  ) {
    const { email, password, role: rawRole } = user;
    const role = GetUserRole(rawRole);
    if (role === UserRole.GUEST) {
      throw new BadRequestException('Invalid input for user Role');
    }
    return await this.usersService.create({ email, password, role });
  }
}
