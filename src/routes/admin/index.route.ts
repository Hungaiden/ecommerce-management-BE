import type { Express } from 'express'
import { toursRoute } from './tours/tour.route'
import { hotelsRoute } from './hotels/hotel.route'
import { accountsRoute } from './accounts/account.route'
import { authsRoute } from './accounts/auth.route'
import { toursCategoryRoute } from './tours/tourCategory.route'
import { tourReviewRoute } from './tours/tourReview.route'
import { roomTypeRoute } from './hotels/roomType.route'
import { tourBookingRoute } from './tours/tourBooking.route'
import { hotelBookingRoute } from './hotels/hotelBooking.route'
import { flightRoute } from './flights/flight.route'
import { ticketClassRoute } from './flights/ticketClass.route'
import { airportRoute } from './flights/airport.route'
import { flightBookingRoute } from './flights/flightBooking.route'
import { flightReviewRoute } from './flights/flightReview.route'

const adminRoutes = (app: Express) => {
  // route tour
  app.use('/tour-categories', toursCategoryRoute)

  app.use('/tours/reviews', tourReviewRoute)

  app.use('/tours/bookings', tourBookingRoute)

  app.use('/tours', toursRoute)

  // route hotel
  app.use('/hotels/reviews', tourReviewRoute)

  app.use('/hotels/bookings', hotelBookingRoute)

  app.use('/hotels', hotelsRoute)

  app.use('/room-types', roomTypeRoute)

  // route flight
  app.use('/flights/reviews', flightReviewRoute)
  app.use('/flights/bookings', flightBookingRoute)
  app.use('/flights', flightRoute)

  app.use('/ticket-classes', ticketClassRoute)

  app.use('/flights/airports', airportRoute)

  // route account
  app.use('/accounts', accountsRoute)

  app.use('/auth', authsRoute)
}

export default adminRoutes
