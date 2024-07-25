import { PaymentRepository } from '../../domain/repositories/payment.repository';
import { Payment } from '../../domain/models/payment.model';

export class PaymentService {
  constructor(private paymentRepository: PaymentRepository) {}

  async createPayment(payment: Payment): Promise<void> {
    return this.paymentRepository.create(payment);
  }
}