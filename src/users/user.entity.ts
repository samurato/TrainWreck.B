import { Column, CreateDateColumn, Entity, getRepository, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty } from 'class-validator';

const crypto = require('crypto');


export enum UserRole {
  ADMIN = 'admin',
  SIGNAL_OPERATOR = 'signal_operator',
  TRAIN_DRIVER = 'train-driver',
}

export interface IUser {
  id: number;
  email: string;
  role: UserRole;
  salt: string;
  password: string;
  disabled: boolean;
  createdDate: Date;
  updatedDate: Date;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty()
  @Column()
  public email: string;

  @Column({type: 'enum', enum: UserRole})
  public role: UserRole;

  @Column({select: false})
  public salt: string;

  @Column({select: false})
  public password: string;

  @Column({default: false})
  public disabled: boolean;

  @CreateDateColumn()
  public createdDate: Date;

  @UpdateDateColumn()
  public updatedDate: Date;

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
    const exists = await repository.count({ email: user.email });
    if (exists) {
      throw new Error('User Already Exists');
    }
    const entity = new User();
    entity.email = user.email.toLowerCase().trim();
    entity.role = user.role;
    const salt = await this.makeSalt();
    entity.salt = salt;
    entity.password = await this.encryptPassword(salt, user.password);
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
   * By making the password and salt unaccessable to queries it becomes impossible
   * to access the values within the entity. A query needs to be performed to get
   * the values at this level
   */
  private async getUnselectableValues(): Promise<{password: string, salt: string}> {
    const currUser = await getRepository(User)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .addSelect('user.salt')
      .where('user.id = :id', { id: this.id })
      .getOne();
    return {password: currUser.password, salt: currUser.salt};
  }
}
