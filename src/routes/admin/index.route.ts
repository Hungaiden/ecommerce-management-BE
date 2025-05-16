import type { Express } from 'express'
import { toursRoute } from './tours/tour.route'
import { hotelsRoute } from './hotels/hotel.route'
import { accountsRoute } from './accounts/account.route'
import { authsRoute } from './accounts/auth.route'
import { toursCategoryRoute } from './tours/tourCategory.route'
import { tourReviewRoute } from './tours/tourReview.route'
import { roomTypeRoute } from './hotels/roomType.route'
const adminRoutes = (app: Express) => {
  // route tour 
  app.use('/tours', toursRoute)

  app.use('/tour-categories', toursCategoryRoute)

  app.use('/tours/reviews', tourReviewRoute)

  // route hotel
  app.use('/hotels', hotelsRoute)

  app.use('/room-types', roomTypeRoute)

  app.use('/hotels/reviews', tourReviewRoute)

  // route account
  app.use('/accounts', accountsRoute)

  app.use('/auth', authsRoute)

  
}

export default adminRoutes
