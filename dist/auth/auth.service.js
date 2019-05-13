"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("../config");
const users_service_1 = require("../users/users.service");
const jwt = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    validateCredentials(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user.Email || !user.Password) {
                return null;
            }
            const foundUser = yield this.usersService.getByEmail(user.Email.toLowerCase().trim());
            if (foundUser) {
                return yield foundUser.authenticate(user.Password);
            }
            return null;
        });
    }
    createToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { JWT_SECRET, JWT_EXPIRY } = config_1.default.auth;
            const user = yield this.usersService.get(userId);
            if (user) {
                const userData = {
                    id: String(user.User_ID),
                    email: user.Email,
                    role: user.Role,
                    updatedDate: user.UpdatedDate.getTime(),
                };
                const token = yield jwt.sign(userData, JWT_SECRET, { expiresIn: JWT_EXPIRY });
                return { token, expires_in: JWT_EXPIRY };
            }
            else {
                throw new common_1.BadRequestException();
            }
        });
    }
    validateUser(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token.Email) {
                return null;
            }
            const user = yield this.usersService.get(token.id);
            if (user) {
                if (user.UpdatedDate.getTime() !== token.UpdatedDate || user.Role !== token.Role) {
                    return null;
                }
                return user;
            }
            return null;
        });
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map