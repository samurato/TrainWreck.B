"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class PaginationOptions {
}
exports.PaginationOptions = PaginationOptions;
const pagination = {
    size: 20,
    min: 1,
    max: 50,
};
exports.Pagination = common_1.createParamDecorator((data, req) => {
    req.query.pageSize = (typeof req.query.limit === 'number') ?
        req.query.pageSize :
        parseInt(req.query.pageSize, 10) || pagination.size;
    req.query.pageIndex = (typeof req.query.pageIndex === 'number') ?
        req.query.pageIndex :
        parseInt(req.query.pageIndex, 10) || 0;
    if (req.query.limit > pagination.max) {
        req.query.pageSize = pagination.max;
    }
    else if (req.query.limit < pagination.min) {
        req.query.pageSize = pagination.min;
    }
    return {
        pageSize: req.query.pageSize,
        pageIndex: req.query.pageIndex,
    };
});
//# sourceMappingURL=pagination.decorator.js.map