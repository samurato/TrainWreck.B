"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toListResponse = (items, pagination, totalItemCount) => {
    return {
        items: items,
        pageInfo: {
            totalItemCount: totalItemCount,
            pageCount: Math.ceil(totalItemCount / pagination.pageSize),
            pageSize: pagination.pageSize,
            pageIndex: pagination.pageIndex,
        },
    };
};
//# sourceMappingURL=rest-helpers.js.map