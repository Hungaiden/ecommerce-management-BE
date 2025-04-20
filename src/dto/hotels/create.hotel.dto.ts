export enum HotelStatus {
  OPENED = "Opened",
  CLOSED = "Closed",
}

export interface CreateHotelDto {
  slug: string;
  name: string;
  description: string;
  category?: string;
  parking_included?: boolean;
  query?: string;
  street_address?: string;
  city?: string;
  state_province?: string;
  postal_code?: string;
  country?: string;
  lat: number;
  lon: number;
  status?: HotelStatus;
  total_rooms: number;
}
