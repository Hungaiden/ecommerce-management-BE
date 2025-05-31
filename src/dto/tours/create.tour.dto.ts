export type TourStatus = 'active' | 'inactive' | 'pending';
export type TransportationType = 'bus' | 'train' | 'airplane' | 'boat';

export interface CreateTourDto {
  title: string; // bắt buộc
  code: string; // bắt buộc, unique
  category_id?: string; // ObjectId string
  images?: string[]; // mảng string (ảnh)
  price: number; // bắt buộc
  discount?: number;
  information?: string;
  schedule?: string;
  duration_days: number; // bắt buộc
  time_start?: Date;
  time_end?: Date;
  stock?: number; // default 0
  transportation?: TransportationType;
  status?: TourStatus; // enum, default 'active'
  position?: number;
}
