import type { Express } from 'express'
import { toursRoute } from './tour.route'

const adminRoutes = (app: Express) => {
 
  app.use('/tours', toursRoute)

}

export default adminRoutes