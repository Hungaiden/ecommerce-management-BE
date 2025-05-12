import type { TourCategoryStatus } from './create.tourCategory.dto'

export interface UpdateTourCategoryDto {
  title?: string;
  image?: string;
  description?: string;
  status?: TourCategoryStatus;
  position?: number;
}
