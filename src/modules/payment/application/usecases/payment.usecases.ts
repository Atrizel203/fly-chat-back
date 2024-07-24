import { PaymentRepository } from '../../domain/repositories/payment.repository';
import { Payment } from '../../domain/models/payment.model';

export class PaymentUseCases {
  constructor(private paymentRepository: PaymentRepository) {}

  async getPaymentById(id: number): Promise<Payment | null> {
    return this.paymentRepository.findById(id);
  }

  async getAllPayments(): Promise<Payment[]> {
    return this.paymentRepository.findAll();
  }

  async createPayment(payment: Payment): Promise<void> {
    return this.paymentRepository.create(payment);
  }
}
