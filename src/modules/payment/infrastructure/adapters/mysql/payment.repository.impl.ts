import { pool } from '../../../../../config/database.config';
import { Payment } from '../../../domain/models/payment.model';

export class PaymentRepository {
  static async create(payment: Payment): Promise<void> {
    const query = 'INSERT INTO Pagos (usuario_id, monto, metodo_pago) VALUES (?, ?, ?)';
    const values = [payment.usuario_id, payment.monto, payment.metodo_pago];
    await pool.query(query, values);
  }
}
