import { PaymentRepository } from '../../domain/repositories/payment.repository';
import { Payment } from '../../domain/models/payment.model';

export class PaymentService {
  constructor(private paymentRepository: PaymentRepository) {}

  async getAllPayments(): Promise<Payment[]> {
    return this.paymentRepository.findAll();
  }

  async getPaymentById(id: number): Promise<Payment | null> {
    return this.paymentRepository.findById(id);
  }

  async createPayment(payment: Payment): Promise<void> {
    return this.paymentRepository.create(payment);
  }
}