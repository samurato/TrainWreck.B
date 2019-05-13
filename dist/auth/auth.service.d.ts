import { IUser, User, UserRole } from "../users/user.entity";
import { UsersService } from '../users/users.service';
export interface IAuthConfig {
    secret: string;
    tokenExpiration: number;
}
export interface JWTPayload {
    id: string;
    email: string;
    role: UserRole;
    updatedDate: number;
}
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    validateCredentials(user: Partial<IUser>): Promise<User>;
    createToken(userId: number): Promise<{
        token: string;
        expires_in: number;
    }>;
    validateUser(token: any): Promise<IUser>;
}
