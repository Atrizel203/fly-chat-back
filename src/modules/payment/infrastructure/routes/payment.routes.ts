import { Router } from 'express';
import { PaymentController } from '../http/controllers/payment.controller';

const router = Router();

router.get('/payments/:id', PaymentController.getPaymentById);
router.get('/payments', PaymentController.getPayments)
router.post('/payments', PaymentController.createPayment);

export default router;