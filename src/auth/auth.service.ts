import { BadRequestException, Injectable } from '@nestjs/common';
import config from '../config';
import { IUser, User, UserRole } from "../users/user.entity";
import { UsersService } from '../users/users.service';
import * as jwt from 'jsonwebtoken';


export interface IAuthConfig {
  secret: string;
  tokenExpiration: number;
}

export interface JWTPayload {
  id: string;
  email: string;
  role: UserRole;
  updatedDate: number; // UNIX TIMESTAMP
}

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public async validateCredentials(user: Partial<IUser>) {
    if (!user.email || !user.password) {
      return null;
    }
    const foundUser = await this.usersService.getByEmail(user.email.toLowerCase().trim());
    if (foundUser) {
      return await foundUser.authenticate(user.password);
    }
    return null;
  }

  public async createToken(userId: number): Promise<{token: string, expires_in: number}> {
    const {JWT_SECRET, JWT_EXPIRY} = config.auth;
    const user: User = await this.usersService.get(userId);
    if (user) {
      const userData: JWTPayload = {
        id: String(user.id),
        email: user.email,
        role: user.role,
        updatedDate: user.updatedDate.getTime(),
      };
      const token = await jwt.sign(userData, JWT_SECRET, {expiresIn: JWT_EXPIRY});
      return {token, expires_in: JWT_EXPIRY};
    } else {
      throw new BadRequestException();
    }
  }
}
