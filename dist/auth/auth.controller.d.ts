import { AuthLoginDto } from './auth.dto';
import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: AuthLoginDto): Promise<{
        user: import("../users/user.entity").User;
        token: string;
        expires_in: number;
    }>;
}
