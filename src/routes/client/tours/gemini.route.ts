import express from 'express'
import { recommendTour } from '../../../controllers/client/tours/gemini.controller'

import { Router } from 'express'
const router: Router = Router()

router.post('/recommend-tour', recommendTour)
export const GeminiRoute: Router = router
