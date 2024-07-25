import { Router } from 'express';
import { PaymentController } from '../http/controllers/payment.controller';

const router = Router();

router.post('/fake-payment', PaymentController.fakePayment);

export default router;
