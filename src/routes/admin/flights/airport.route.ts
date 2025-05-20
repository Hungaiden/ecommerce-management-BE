import { Router } from 'express'
import { authMiddleware } from '../../../middlewares/auth.middleware'
const router: Router = Router()

import * as airportController from '../../../controllers/admin/flights/airport.controller'

router.post(
  '/create',
  authMiddleware.isAuthorized,
  airportController.createAirport,
)

router.get('/', airportController.getAllAirports)

router.get('/detail/:id', airportController.getAirportById)

router.patch(
  '/update/:id',
  authMiddleware.isAuthorized,
  airportController.updateAirport,
)

router.delete(
  '/delete/:id',
  authMiddleware.isAuthorized,
  airportController.deleteAirport,
)

export const airportRoute: Router = router
