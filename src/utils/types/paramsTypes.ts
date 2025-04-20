import { TourStatus } from '../../dto/tours/create.tour.dto';

export type SortParams = { sortBy: string; sortType: SORT_TYPE };

export type SearchParams = { keyword: string; field: string };

export type PaginateParams = { offset: number; limit: number };

export type TourFilterParams = {
  status?: string; 
  minPrice?: number;
  maxPrice?: number;
};


export enum SORT_TYPE {
  'DESC' = 'desc',
  'ASC' = 'asc', 
} 


