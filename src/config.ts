const hostConfig = {
  PORT: 3000 || process.env.PORT,
};

const databaseConfig = {
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://gli-dev:thecakeisalie@localhost:5432/trainwreck',
}

export default {
  host: hostConfig,
  db: databaseConfig,
};
