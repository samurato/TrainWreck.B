const JWTConfig = {
    SECRET: 'thecakeisalie',
    TIMEOUT: '2d'
}

const DBConfig = {
    URL: 'mongodb://localhost/trainwreckers'
}

export default {
    JWT: JWTConfig,
    DB: DBConfig
}