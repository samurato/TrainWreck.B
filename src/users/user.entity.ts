import { Column, CreateDateColumn, Entity, getRepository, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty } from 'class-validator';

const crypto = require('crypto');


export enum UserRole {
  ADMIN = 'admin',
  SIGNAL_OPERATOR = 'signal_operator',
  TRAIN_DRIVER = 'train-driver',
  GUEST = 'guest',
}

export function GetUserRole(role: string): UserRole {
  switch (role) {
    case 'admin':
      return UserRole.ADMIN;
    case 'signal_operator':
      return UserRole.SIGNAL_OPERATOR;
    case 'train-driver':
      return UserRole.TRAIN_DRIVER;
    case 'guest':
    default:
      return UserRole.GUEST;
  }
}

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

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  public User_ID: number;

  @IsNotEmpty()
  @Column()
  public Email: string;

  @Column({type: 'enum', enum: UserRole})
  public Role: UserRole;

  @Column({select: false})
  public Salt: string;

  @Column({select: false})
  public Password: string;

  @Column({default: false})
  public IsActive: boolean;

  @CreateDateColumn()
  public CreatedDate: Date;

  @UpdateDateColumn()
  public UpdatedDate: Date;

  public async authenticate(plaintext: string) {
    const values = await this.getUnselectableValues();
    const hash = await User.encryptPassword(values.salt, plaintext);
    if (values.password === hash) {
      return this;
    }
    return null;
  }

  public static async create(user: Partial<IUser>): Promise<User> {
    const repository = getRepository('user');
    const exists = await repository.count({ email: user.Email });
    if (exists) {
      throw new Error('User Already Exists');
    }
    const entity = new User();
    entity.Email = user.Email.toLowerCase().trim();
    entity.Role = user.Role;
    const salt = await this.makeSalt();
    entity.Salt = salt;
    entity.Password = await this.encryptPassword(salt, user.Password);
    return await repository.save(entity);
  }

  private static async makeSalt(): Promise<string> {
    return await crypto.randomBytes(16).toString('base64');
  }

  private static async encryptPassword(currSalt: string, password: string) {
    if (!password || !currSalt) {
      return '';
    }
    const salt = Buffer.from(currSalt, 'base64');
    return await crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
  }

  /**
   * By making the Password and Salt unaccessable to queries it becomes impossible
   * to access the values within the entity. A query needs to be performed to get
   * the values at this level
   */
  private async getUnselectableValues(): Promise<{password: string, salt: string}> {
    const currUser = await getRepository(User)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .addSelect('user.Salt')
      .where('user.User_ID = :User_ID', { id: this.User_ID })
      .getOne();
    return {password: currUser.Password, salt: currUser.Salt};
  }
}
