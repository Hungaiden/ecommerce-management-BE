export interface TourData {
  title: string
  code: string
  images: string
  price: number
  discount: number
  information: string
  schedule: string
  time_start: Date
  stock: number
  status: 'active' | 'inactive' | 'pending'
  position?: number
}