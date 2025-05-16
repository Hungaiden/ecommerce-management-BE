export interface CreateHotelReviewDto {
  hotel_id: string;
  user_id: string;
  rating: number;
  content?: string;
  images?: string[];
  is_approved?: boolean;
}
