import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUser, User } from './user.entity';
import { Repository } from 'typeorm';
import { USER_REPOSITORY_TOKEN } from './user.providers';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: Repository<User>) {}

  public async create(userData: {email, password, role}) {
    const existingUser = await this.userRepository.findOne({Email: userData.email});
    if (!existingUser) {
      const user = await User.create({Email: userData.email, Password: userData.password, Role: userData.role});
      return {id: user.User_ID};
    } else {
      throw new BadRequestException('User already exists.');
    }
  }

  public async getByEmail(email: string): Promise<User> {
    const lower = email.toLowerCase().trim();
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.Email = :Email', {email: lower })
      .getOne() as User;
  }

  public async get(userId) {
    return await this.userRepository.findOne(userId);
  }
}
