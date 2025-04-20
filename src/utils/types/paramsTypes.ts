export type SortParams = { sortBy: string; sortType: SORT_TYPE };
export type SearchParams = { keywork: string; field: string };

export type PaginateParams = { offset: number; limit: number };

export enum SORT_TYPE {
  'DESC' = 'desc',
  'ASC' = 'asc', 
}