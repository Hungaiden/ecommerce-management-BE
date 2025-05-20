import { Router } from 'express'
import { authMiddleware } from '../../../middlewares/auth.middleware'
const router: Router = Router()

import * as hotelBookingController from '../../../controllers/admin/hotels/hotelBooking.controller'

// Route đặt phòng khách sạn
router.post('/create', hotelBookingController.createHotelBooking)

// Route lấy tất cả bookings
router.get(
  '/',
  authMiddleware.isAuthorized,
  hotelBookingController.getAllHotelBookings,
)

// Route lấy chi tiết booking theo ID
router.get('/detail/:bookingId', hotelBookingController.getHotelBookingById)

// Route lấy bookings theo khách sạn
router.get('/hotel/:hotelId', hotelBookingController.getBookingsByHotelId)

// Route lấy bookings của user
router.get('/user/:userId', hotelBookingController.getBookingsByUserId)

// Route cập nhật trạng thái booking
// router.patch(
//   "/update-status/:bookingId",
//   authMiddleware.isAuthorized,
//   hotelBookingController.updateBookingStatus
// );

// // Route cập nhật thông tin booking
// router.patch(
//   "/update/:bookingId",
//   authMiddleware.isAuthorized,
//   hotelBookingController.updateBooking
// );

// Route hủy booking
// router.delete("/cancel/:bookingId", hotelBookingController.cancelBooking);

export const hotelBookingRoute: Router = router
