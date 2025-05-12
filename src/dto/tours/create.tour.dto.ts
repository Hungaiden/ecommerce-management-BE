export enum TourStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
}

export interface CreateTourDto {
  title: string;
  code: string;
  category_id?: string;
  images?: string;
  price?: number;
  discount?: number;
  information?: string;
  schedule?: string;
  time_start?: Date;
  time_end?: Date;
  stock?: number;
  status?: TourStatus;
  position?: number;
}