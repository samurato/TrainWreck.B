import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUser, User } from './user.entity';
import { Repository } from 'typeorm';
import { USER_REPOSITORY_TOKEN } from './user.providers';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: Repository<IUser>) {}

  public async create(userData: {email, password, role}) {
    const existingUser = await this.userRepository.findOne({email: userData.email});
    if (!existingUser && userData.password.length >= 8) {
      const user = await User.create(userData);
      return {id: user.id};
    } else {
      if (existingUser) {
        throw new BadRequestException('User already exists.');
      }
      throw new BadRequestException('Password less than 8 characters.');
    }
  }
}
