export interface CreateTicketClassDto {
  flight_id: string;
  class: "economy" | "premium_economy" | "business" | "first";
  base_price: number;
  tax: number;
  service_fee: number;
  discount?: number;
  services?: string[];
}
