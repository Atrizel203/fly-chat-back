import { PaymentRepository } from '../../infrastructure/adapters/mysql/payment.repository.impl';
import { Payment } from '../../domain/models/payment.model';

export class CreatePaymentUseCase {
  static async execute(payment: Payment): Promise<void> {
    await PaymentRepository.create(payment);
  }
}
