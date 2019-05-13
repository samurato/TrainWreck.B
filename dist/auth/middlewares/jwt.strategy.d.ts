import { AuthService } from '../auth.service';
export declare class JwtStrategy {
    private readonly authService;
    private readonly jwtStrategy;
    constructor(authService: AuthService);
    verify(req: any, payload: any, done: any): Promise<any>;
}
