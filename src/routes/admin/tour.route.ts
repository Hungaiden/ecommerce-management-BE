import { Router } from 'express'
import multer from 'multer'
const router: Router = Router()

import * as controller from '../../controllers/admin/tour.controller'

router.get('/', controller.getAllTours)

router.post('/create', controller.createPost)

router.get('/detail/:id', controller.getTourById)

router.patch('/update/:id', controller.updateTour)

router.delete('/delete/:id', controller.deleteTour)

export const toursRoute: Router = router