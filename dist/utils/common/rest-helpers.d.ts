import { PaginationOptions } from './pagination.decorator';
export interface IPageInfo {
    totalItemCount: number;
    pageCount: number;
    pageSize: number;
    pageIndex: number;
}
export interface IPaginatedResponse<T> {
    items: T[];
    pageInfo: IPageInfo;
}
export declare const toListResponse: <T = any>(items: T[], pagination: PaginationOptions, totalItemCount: number) => IPaginatedResponse<T>;
