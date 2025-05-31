import { Router } from 'express'
import {
  createPaymentUrl,
  vnpayReturn,
} from '../../../controllers/payment/vnpay.controller'

const router = Router()

router.post('/create-payment-url/:bookingId', createPaymentUrl)

router.get('/vnpay-return', vnpayReturn)

export const VNPayRoute: Router = router
