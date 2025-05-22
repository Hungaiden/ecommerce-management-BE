export interface CreateAirlineDto {
  name: string;
  iata_code: string;
  logo?: string;
  country: string;
  deleted?: boolean;
  deleted_at?: Date;
}
