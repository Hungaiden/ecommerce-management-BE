export interface CreateHotelBookingDto {
  hotel_id: string;
  room_type_id: string;
  user_id?: string;
  check_in: Date;
  check_out: Date;
  num_rooms: number;
  special_requests?: string;
  contact_info: {
    name: string;
    phone: string;
    email: string;
  };
  payment_method?: 'vnpay' | 'momo' | 'cash';
  status?: 'pending' | 'confirmed' | 'cancelled';
}
