import { Payment } from "../models/payment.model";

export interface PaymentRepository {
  create(payment: Payment): Promise<void>;
}
