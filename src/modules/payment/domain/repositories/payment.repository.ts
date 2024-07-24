import { Payment } from "../models/payment.model";

export interface PaymentRepository {
  findAll(): Promise<Payment[]>;
  findById(id: number): Promise<Payment | null>;
  create(payment: Payment): Promise<void>;
}
