import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(userData: {
        email: any;
        password: any;
        role: any;
    }): Promise<{
        id: number;
    }>;
    getByEmail(email: string): Promise<User>;
    get(userId: any): Promise<User>;
}
