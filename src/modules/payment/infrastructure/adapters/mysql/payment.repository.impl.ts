import { PaymentRepository } from '../../../domain/repositories/payment.repository';
import { Payment } from '../../../domain/models/payment.model';
import { pool } from '../../../../../config/database.config';

export class MySQLPaymentRepository implements PaymentRepository {
  async findAll(): Promise<Payment[]> {
    const [rows] = await pool.query('SELECT * FROM Pagos');
    return rows as Payment[];
  }

  async findById(id: number): Promise<Payment | null> {
    const [rows] = await pool.query('SELECT * FROM Pagos WHERE id = ?', [id]);
    const payments = rows as Payment[];
    return payments.length ? payments[0] : null;
  }

  async create(payment: Payment): Promise<void> {
    await pool.query('INSERT INTO Pagos (usuario_id, monto, fecha_pago, metodo_pago) VALUES (?, ?, ?, ?)', [payment.usuario_id, payment.monto, payment.fecha_pago, payment.metodo_pago]);
  }
}