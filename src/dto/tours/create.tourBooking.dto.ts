export interface CreateTourBookingDto {
  tour_id: string;
  booking_date: Date;
  start_date: Date;
  number_of_people: number;
  contact_info: {
    name: string;
    phone: string;
    email: string;
  };
  total_price: number;
  note?: string;
  payment_method?: 'vnpay' | 'momo' | 'cash';
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
  user_id?: string;
}
