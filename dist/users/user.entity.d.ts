export declare enum UserRole {
    ADMIN = "admin",
    SIGNAL_OPERATOR = "signal_operator",
    TRAIN_DRIVER = "train-driver",
    GUEST = "guest"
}
export declare function GetUserRole(role: string): UserRole;
export interface IUser {
    User_ID: number;
    Email: string;
    Role: UserRole;
    Salt: string;
    Password: string;
    IsActive: boolean;
    CreatedDate: Date;
    UpdatedDate: Date;
}
export declare class User {
    User_ID: number;
    Email: string;
    Role: UserRole;
    Salt: string;
    Password: string;
    IsActive: boolean;
    CreatedDate: Date;
    UpdatedDate: Date;
    authenticate(plaintext: string): Promise<this>;
    static create(user: Partial<IUser>): Promise<User>;
    private static makeSalt;
    private static encryptPassword;
    private getUnselectableValues;
}
