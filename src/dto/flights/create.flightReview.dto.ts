export interface CreateFlightReviewDto {
  flight_id: string;
  user_id: string;
  rating: number;
  comment?: string;
  images?: string[];
  is_approved?: boolean;
}
