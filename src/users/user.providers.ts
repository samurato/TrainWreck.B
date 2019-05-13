import { Connection } from 'typeorm';
import { User } from './user.entity';

export const USER_REPOSITORY_TOKEN = 'UserRepositoryToken';

export const userProviders = [{
  provide: USER_REPOSITORY_TOKEN,
  useFactory: (connection: Connection) => connection.getRepository(User),
  inject: ['DbConnectionToken'],
}];
