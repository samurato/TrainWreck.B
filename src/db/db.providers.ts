import { createConnection } from 'typeorm';
import config from '../config';
import { User } from '../users/user.entity';
export const dbProviders =
    {
        provide: 'DbConnectionToken',
        useFactory: async () => await createConnection({
            type: 'postgres',
            url: config.db.DATABASE_URL,
            entities: [
                User,
            ],
            synchronize: (process.env.NODE_ENV === 'development'),
        }),
    };
