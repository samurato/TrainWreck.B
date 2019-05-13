"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const passport = require("passport");
exports.JWTAuthMiddleware = (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        if (err) {
            next(err);
            return;
        }
        if (!user) {
            next(new common_1.HttpException(info ? info.message : '', common_1.HttpStatus.UNAUTHORIZED));
            return;
        }
        next();
    })(req, res, next);
};
//# sourceMappingURL=jwt.auth.middleware.js.map