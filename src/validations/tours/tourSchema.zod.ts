import { z } from 'zod'

const TransportationEnum = z.enum(['bus', 'train', 'airplane', 'boat'])
const TourStatusEnum = z.enum(['active', 'inactive', 'pending'])

export const CreateTourSchema = z.object({
  title: z.string().min(1, 'Title is required'),

  code: z.string().min(1, 'Code is required'),

  category_id: z.string().min(1, 'Category is required'), // ObjectId dưới dạng string

  images: z
    .array(z.string().url({ message: 'Each image must be a valid URL' }))
    .optional(),

  price: z.number({ required_error: 'Price is required' }).min(0, 'Price must be non-negative'),

  discount: z.number().min(0).optional(),

  information: z.string().optional(),

  schedule: z.string().optional(),

  duration_days: z
    .number({ required_error: 'Duration is required' })
    .min(1, 'Must be at least 1 day'),

  stock: z.number().int().min(0, 'Stock must be non-negative').optional(),

  transportation: TransportationEnum.optional(),

  status: TourStatusEnum.optional().default('active'),

  position: z.number().int().min(0).optional(),

  is_featured: z.boolean().optional().default(false),
})


export const UpdateTourSchema = z.object({
  _id: z.string().min(1, 'ID is required'),

  title: z.string().min(1).optional(),

  code: z.string().min(1).optional(),

  category_id: z.string().min(1).optional(),

  images: z
    .array(z.string().url({ message: 'Each image must be a valid URL' }))
    .optional(),

  price: z.number().min(0).optional(),

  discount: z.number().min(0).optional(),

  information: z.string().optional(),

  schedule: z.string().optional(),

  time_start: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .transform((val) => new Date(val))
    .optional(),

  time_end: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .transform((val) => new Date(val))
    .optional(),

  stock: z.number().int().min(0).optional(),

  position: z.number().int().min(0).optional(),

  transportation: TransportationEnum.optional(),

  status: TourStatusEnum.optional(),

  is_featured: z.boolean().optional(),
})

export const CreateTourBookingSchema = z.object({
  tour_id: z.string().min(1, 'tour_id is required'),

  user_id: z.string().optional(), // optional nếu không bắt buộc đăng nhập

  start_date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid start_date format',
    })
    .transform((val) => new Date(val)),

  number_of_people: z.number().int().min(1).default(1),

  contact_info: z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().min(1, 'Phone is required'),
    email: z.string().email('Invalid email format'),
  }),

  note: z.string().optional(),

  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).default('pending'),

  total_price: z.number().min(0, 'Total price must be non-negative'),

  payment_status: z
    .enum(['pending', 'paid', 'failed', 'refunded'])
    .default('pending'),

  payment_method: z.enum(['vnpay', 'momo', 'cash']).default('vnpay'),

  transaction_code: z.string().optional(),

  payment_time: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid payment_time format',
    })
    .transform((val) => new Date(val))
    .optional(),

  vnp_response_code: z.string().optional(),

  payment_url: z.string().url().optional(),
})

export const CreateTourCategorySchema = z.object({
  title: z.string().min(1, 'Title is required'),

  images: z.array(z.string().url()).optional(), // URL của ảnh đã upload lên Cloudinary chẳng hạn

  description: z.string().optional(),

  status: z.enum(['active', 'inactive']).default('active'),

  position: z.number().optional(),
})

export const UpdateTourCategorySchema = z.object({
  _id: z.string().min(1, 'ID is required'), // ID là bắt buộc để xác định bản ghi cần update

  title: z.string().optional(),

  images: z.array(z.string().url()).optional(),

  description: z.string().optional(),

  status: z.enum(['active', 'inactive']).optional(),

  position: z.number().optional(),
})



export const CreateTourReviewSchema = z.object({
  tour_id: z.string().min(1, 'Tour ID is required'),

  user_id: z.string().min(1, 'User ID is required'),

  rating: z.number().min(1).max(5),

  comment: z.string().max(1000).optional(),

  images: z.array(z.string().url()).optional(), // Link ảnh (nếu có)
})

export const UpdateTourReviewSchema = z.object({
  _id: z.string().min(1, 'Review ID is required'),

  rating: z.number().min(1).max(5).optional(),

  comment: z.string().max(1000).optional(),

  images: z.array(z.string().url()).optional(),

  is_approved: z.boolean().optional(), // Trường này thường chỉ cho Admin chỉnh
})
