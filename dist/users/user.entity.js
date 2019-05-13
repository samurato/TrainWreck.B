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
var User_1;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const crypto = require('crypto');
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["SIGNAL_OPERATOR"] = "signal_operator";
    UserRole["TRAIN_DRIVER"] = "train-driver";
    UserRole["GUEST"] = "guest";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
function GetUserRole(role) {
    switch (role) {
        case 'admin':
            return UserRole.ADMIN;
        case 'signal_operator':
            return UserRole.SIGNAL_OPERATOR;
        case 'train-driver':
            return UserRole.TRAIN_DRIVER;
        case 'guest':
        default:
            return UserRole.GUEST;
    }
}
exports.GetUserRole = GetUserRole;
let User = User_1 = class User {
    authenticate(plaintext) {
        return __awaiter(this, void 0, void 0, function* () {
            const values = yield this.getUnselectableValues();
            const hash = yield User_1.encryptPassword(values.salt, plaintext);
            if (values.password === hash) {
                return this;
            }
            return null;
        });
    }
    static create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = typeorm_1.getRepository('User');
            const exists = yield repository.count({ email: user.Email });
            if (exists) {
                throw new Error('User Already Exists');
            }
            const entity = new User_1();
            entity.Email = user.Email.toLowerCase().trim();
            entity.Role = user.Role;
            const salt = yield this.makeSalt();
            entity.Salt = salt;
            entity.Password = yield this.encryptPassword(salt, user.Password);
            return yield repository.save(entity);
        });
    }
    static makeSalt() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield crypto.randomBytes(16).toString('base64');
        });
    }
    static encryptPassword(currSalt, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!password || !currSalt) {
                return '';
            }
            const salt = Buffer.from(currSalt, 'base64');
            return yield crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
        });
    }
    getUnselectableValues() {
        return __awaiter(this, void 0, void 0, function* () {
            const currUser = yield typeorm_1.getRepository(User_1)
                .createQueryBuilder('User')
                .addSelect('User.Password')
                .addSelect('User.Salt')
                .where('User.User_ID = :User_ID', { User_ID: this.User_ID })
                .getOne();
            return { password: currUser.Password, salt: currUser.Salt };
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "User_ID", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "Email", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum', enum: UserRole }),
    __metadata("design:type", String)
], User.prototype, "Role", void 0);
__decorate([
    typeorm_1.Column({ select: false }),
    __metadata("design:type", String)
], User.prototype, "Salt", void 0);
__decorate([
    typeorm_1.Column({ select: false }),
    __metadata("design:type", String)
], User.prototype, "Password", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "IsActive", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "CreatedDate", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "UpdatedDate", void 0);
User = User_1 = __decorate([
    typeorm_1.Entity('User')
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map