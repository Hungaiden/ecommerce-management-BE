export interface CreateRoomTypeDto {
  hotel_id: string;
  description: string;
  title?: string;
  total_beds: number;
  sleeps_count?: number;
  price_per_night: number;
  amenities?: string[];
  images?: string[];
  available_rooms: number;
  total_rooms: number;
  position?: number;
}
