import { UsersService } from './users.service';
export declare class UsersPrivateController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUser(userId: string): Promise<import("./user.entity").User>;
}
