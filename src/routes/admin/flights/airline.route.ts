import { Router } from 'express'
import { authMiddleware } from '../../../middlewares/auth.middleware'
const router: Router = Router()

import * as airlineController from '../../../controllers/admin/flights/airline.controller'

router.post(
  '/create',
  authMiddleware.isAuthorized,
  airlineController.createAirline,
)

router.get('/', airlineController.getAllAirlines)

router.get('/detail/:id', airlineController.getAirlineById)

router.patch(
  '/update/:id',
  authMiddleware.isAuthorized,
  airlineController.updateAirline,
)

router.delete(
  '/delete/:id',
  authMiddleware.isAuthorized,
  airlineController.deleteAirline,
)

export const airlineRoute: Router = router
