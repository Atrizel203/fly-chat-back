  import { Request, Response } from 'express';
  import { PaymentUseCases } from '../../../application/usecases/payment.usecases';
  import { MySQLPaymentRepository } from '../../adapters/mysql/payment.repository.impl';
  import { Payment } from '../../../domain/models/payment.model';

  const paymentRepository = new MySQLPaymentRepository();
  const paymentUseCases = new PaymentUseCases(paymentRepository);

  export class PaymentController {
    static async getPayments(req: Request, res: Response): Promise<void> {
      const payments = await paymentUseCases.getAllPayments();
      res.json(payments);
    }

    static async getPaymentById(req: Request, res: Response): Promise<void> {
      const id = parseInt(req.params.id, 10);
      const payment = await paymentUseCases.getPaymentById(id);
      if (payment) {
        res.json(payment);
      } else {
        res.status(404).send('Payment not found');
      }
    }

    static async createPayment(req: Request, res: Response): Promise<void> {
      const payment = req.body as Payment;
      await paymentUseCases.createPayment(payment);
      res.status(201).send('Payment created');
    }

    
  }
