import { Request, Response } from 'express';
import { CreatePaymentUseCase } from '../../../application/usecases/payment.usecases';

export class PaymentController {
  static async fakePayment(req: Request, res: Response): Promise<void> {
    const { userId, amount, paymentMethod } = req.body;

    try {
      const payment = {
        usuario_id: userId,
        monto: amount,
        metodo_pago: paymentMethod
      };

      await CreatePaymentUseCase.execute(payment);

      res.json({ message: 'Pago exitoso' });
    } catch (error) {
      console.error('Error al procesar el pago ficticio:', error);
      res.status(500).json({ message: 'Error al procesar el pago ficticio' });
    }
  }
}
