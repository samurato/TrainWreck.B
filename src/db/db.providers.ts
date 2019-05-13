import { createConnection } from 'typeorm';
import config from '../config';
import { User } from '../users/user.entity';
export const dbProviders =
    {
        provide: 'DbConnectionToken',
        useFactory: async () => await createConnection({
            type: 'postgres',
            url: 'postgres://bhgykoevqflkwf:5a0eaa362d46ec2de81ae3521fbfecf315d4520bc0993297c99d3e4d04a9ccad@ec2-54-225-116-36.compute-1.amazonaws.com:5432/d1mgec9drukloh',//config.db.DATABASE_URL,
            entities: [
                User,
            ],
            extra: {
              ssl: true,
            },
            synchronize: (process.env.NODE_ENV === 'development'),
        }),
    };
