export enum TourCategoryStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface CreateTourCategoryDto {
  title: string;
  image?: string;
  description?: string;
  status?: TourCategoryStatus;
  position?: number;
}
