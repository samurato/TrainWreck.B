"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hostConfig = {
    PORT: 3000 || process.env.PORT,
};
const databaseConfig = {
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://gli-dev:thecakeisalie@localhost:5432/trainwreck_new',
};
const authConfig = {
    JWT_SECRET: process.env.JWT_SECRET || 'thecakeisalie',
    JWT_EXPIRY: parseInt(process.env.JWT_EXPIRY, 10) || 60 * 60 * 24,
};
exports.default = {
    host: hostConfig,
    db: databaseConfig,
    auth: authConfig,
};
//# sourceMappingURL=config.js.map