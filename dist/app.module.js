"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const jwt_auth_middleware_1 = require("./auth/middlewares/jwt.auth.middleware");
const auth_private_controller_1 = require("./auth/auth.private.controller");
const logger_middleware_1 = require("./utils/middlewares/logger.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(jwt_auth_middleware_1.JWTAuthMiddleware)
            .forRoutes(auth_private_controller_1.AuthPrivateController);
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .with('ApplicationModule')
            .forRoutes('*');
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [auth_module_1.AuthModule, users_module_1.UsersModule],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map