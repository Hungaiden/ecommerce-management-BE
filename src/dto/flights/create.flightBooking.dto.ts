export interface ContactInfo {
  name: string;
  phone: string;
  email: string;
}

export interface CreateFlightBookingDto {
  flight_id: string;
  user_id?: string;
  travel_class: string;
  booking_date?: Date;
  seat_number: string;
  contact_info: ContactInfo;
  note?: string;
  total_price: number;
  payment_method?: 'vnpay' | 'momo' | 'cash' | 'paypal' | 'credit_card';
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
}
