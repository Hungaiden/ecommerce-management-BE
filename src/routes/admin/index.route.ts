import type { Express } from 'express'
import { toursRoute } from './tours/tour.route'
import { hotelsRoute } from './hotels/hotel.route'
import { accountsRoute } from './accounts/account.route'
import { authsRoute } from './accounts/auth.route'
import { toursCategoryRoute } from './tours/tourCategory.route'
const adminRoutes = (app: Express) => {
  app.use('/tours', toursRoute)

  app.use('/tour-categories', toursCategoryRoute)

  app.use('/hotels', hotelsRoute)

  app.use('/accounts', accountsRoute)
  
  app.use('/auth', authsRoute)
}

export default adminRoutes
