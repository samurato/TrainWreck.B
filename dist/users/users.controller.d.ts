import { UsersRegisterDto } from './users.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(user: UsersRegisterDto): Promise<{
        id: number;
    }>;
}
