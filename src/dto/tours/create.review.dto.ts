export interface CreateReviewDto {
  tour_id: string;
  user_id: string;
  rating: number;
  content?: string;
  images?: string[];
  is_approved?: boolean;
}