export interface CreateFlightDto {
  flight_number: string;
  airline_id: string; // Thêm airline_id
  origin_airport_id: string;
  destination_airport_id: string;
  departure_datetime: Date;
  arrival_datetime: Date;
  duration_minutes: number;
  available_seats: number;
  status?: "scheduled" | "in-air" | "landed" | "canceled";
}
