"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("./user.entity");
exports.USER_REPOSITORY_TOKEN = 'UserRepositoryToken';
exports.userProviders = [{
        provide: exports.USER_REPOSITORY_TOKEN,
        useFactory: (connection) => connection.getRepository(user_entity_1.User),
        inject: ['DbConnectionToken'],
    }];
//# sourceMappingURL=user.providers.js.map