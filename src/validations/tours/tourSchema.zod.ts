import { z } from "zod";

export const TourStatusEnum = z.enum(["active", "inactive"]);

export const CreateTourSchema = z.object({
  title: z.string().min(1, "Title is required"),
  code: z.string().min(1, "Code is required"),
  category_id: z.string().optional(),
  images: z.array(z.string().url()).optional(), // array các link ảnh
  price: z
    .string()
    .transform((val) => Number(val))
    .optional(),
  discount: z
    .string()
    .transform((val) => Number(val))
    .optional(),
  information: z.string().optional(),
  schedule: z.string().optional(),
  duration_days: z
    .string()
    .transform((val) => Number(val))
    .optional(),
  time_start: z
    .string()
    .transform((val) => new Date(val))
    .optional(),
  time_end: z
    .string()
    .transform((val) => new Date(val))
    .optional(),
  stock: z
    .string()
    .transform((val) => Number(val))
    .optional(),
  status: TourStatusEnum,
  position: z
    .string()
    .transform((val) => Number(val))
    .optional(),
});

export const UpdateTourSchema = z.object({
  _id: z.string().min(1, "ID is required"),

  title: z.string().optional(),
  code: z.string().optional(),
  category_id: z.string().optional(),
  images: z.string().optional(),

  price: z
    .string()
    .transform((val) => Number(val))
    .optional(),
  discount: z
    .string()
    .transform((val) => Number(val))
    .optional(),

  information: z.string().optional(),
  schedule: z.string().optional(),

  time_start: z
    .string()
    .transform((val) => new Date(val))
    .optional(),
  time_end: z
    .string()
    .transform((val) => new Date(val))
    .optional(),

  stock: z
    .string()
    .transform((val) => Number(val))
    .optional(),
  position: z
    .string()
    .transform((val) => Number(val))
    .optional(),

  status: TourStatusEnum.optional(),
});

export const CreateTourBookingSchema = z.object({
  tour_id: z.string(),
  booking_date: z.coerce.date(),
  start_date: z.coerce.date(),
  number_of_people: z.coerce.number().int().min(1),  // Đã sửa
  contact_info: z.object({
    name: z.string().min(1),
    phone: z.string().min(10),
    email: z.string().email(),
  }),
  total_price: z.coerce.number().min(0),             // Đã sửa
  note: z.string().optional(),
  payment_method: z.enum(["vnpay", "momo", "cash"]).optional(),
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]).optional(),
  payment_status: z.enum(["pending", "paid", "failed", "refunded"]).optional(),
  user_id: z.string().optional(),
});

export const CreateTourCategorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  image: z.array(z.string().url()).optional(), 
  description: z.string().optional(),
  status: z
    .string()
    .optional()
    .transform((val) => (val === undefined ? undefined : val.toLowerCase()))
    .refine(
      (val) => val === undefined || val === "active" || val === "inactive",
      { message: "Status must be 'active' or 'inactive'" }
    ),
  position: z
    .string()
    .optional()
    .transform((val) => (val === undefined ? undefined : Number(val)))
    .refine((val) => val === undefined || !isNaN(val), {
      message: "Position must be a number",
    }),
});

export const UpdateTourCategorySchema = z.object({
  _id: z.string().min(1, "ID is required"),
  title: z.string().optional(),
  image: z.string().optional(),
  description: z.string().optional(),
  status: z
    .string()
    .optional()
    .transform((val) => (val === undefined ? undefined : val.toLowerCase()))
    .refine(
      (val) => val === undefined || val === "active" || val === "inactive",
      { message: "Status must be 'active' or 'inactive'" }
    ),
  position: z
    .string()
    .optional()
    .transform((val) => (val === undefined ? undefined : Number(val)))
    .refine((val) => val === undefined || !isNaN(val), {
      message: "Position must be a number",
    }),
});

export const CreateReviewSchema = z.object({
  tour_id: z.string().min(1, "Tour ID is required"),
  user_id: z.string().min(1, "User ID is required"),
  rating: z
    .string()
    .min(1, "Rating is required")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 1 && val <= 5, {
      message: "Rating must be a number between 1 and 5",
    }),
  content: z
    .string()
    .max(1000, "Nội dung đánh giá không được vượt quá 1000 ký tự")
    .optional(),
  images: z
    .any()
    .optional()
    .transform((val) => {
      if (!val) return undefined;
      if (Array.isArray(val)) return val;
      if (typeof val === "string") return [val];
      return undefined;
    }),
  is_approved: z
    .string()
    .optional()
    .transform((val) => {
      if (val === undefined) return undefined;
      if (val === "true" || val === "1") return true;
      if (val === "false" || val === "0") return false;
      return undefined;
    }),
});
