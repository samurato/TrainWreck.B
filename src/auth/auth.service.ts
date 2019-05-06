import { BadRequestException, Injectable } from '@nestjs/common';
import config from 'src/config';

@Injectable()
export class AuthService {
  // public async createToken(userId: string): Promise<{token: string, expires_in: number}> {
  //   const {JWT_SECRET, JWT_EXPIRY} = config.auth;
  //   let user: IUser;
  //   user = await this.usersService.getById(userId);
  //   if (user) {
  //     const userData: JWTPayload = {
  //       id: user.id,
  //       email: user.email,
  //       role: user.role,
  //       updatedDate: user.updatedDate.getTime()
  //     };
  //     const token = await jwt.sign(userData, JWT_SECRET, {expiresIn: JWT_EXPIRY});
  //     return {token, expires_in: JWT_EXPIRY};
  //   } else {
  //     throw new BadRequestException();
  //   }
  // }
}
