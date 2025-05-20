export interface CreateAirportDto {
  name: string;
  code: string;
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
  terminals?: string[];
  status?: "active" | "inactive";
}
