import { AuthService } from './auth.service';
import { IUser } from '../users/user.entity';
export declare class AuthPrivateController {
    private readonly authService;
    constructor(authService: AuthService);
    extend(viewer: Partial<IUser>): Promise<{
        token: string;
        expires_in: number;
    }>;
}
