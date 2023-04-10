export interface BookingStatisticsResponse {
  cars_id: number;
  booking_count: number;
  longest_booking_duration: number;
  min_price: number;
  max_price: number;
  shortest_booking_duration: number;
  all_price_sum: number;
  average_booking_duration: number;
  car_number: string;
}