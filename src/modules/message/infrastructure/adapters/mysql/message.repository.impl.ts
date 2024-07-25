import { MessageRepository } from '../../../domain/repositories/message.repository';
import { Message } from '../../../domain/models/message.model';
import { pool } from '../../../../../config/database.config';

export class MySQLMessageRepository implements MessageRepository {
  
  async findAll(): Promise<Message[]> {
    console.log('Fetching all messages');
    const [rows] = await pool.query('SELECT * FROM Mensajes');
    return rows as Message[];
  }


  async findByUserId(userId: number): Promise<Message[]> {
    console.log(`Fetching messages for userId: ${userId}`);
    const [rows] = await pool.query('SELECT * FROM Mensajes WHERE remitente_id = ? OR destinatario_id = ?', [userId, userId]);
    return rows as Message[];
  }

  async findById(id: number): Promise<Message | null> {
    console.log(`Fetching message by id: ${id}`);
    const [rows] = await pool.query('SELECT * FROM Mensajes WHERE id = ?', [id]) as any[];
    if (rows.length === 0) {
      return null;
    }
    return rows[0] as Message;
  }

  async delete(id: number): Promise<void> {
    console.log(`Deleting message by id: ${id}`);
    await pool.query('DELETE FROM Mensajes WHERE id = ?', [id]);
  }

  async create(message: Message): Promise<void> {
    console.log('Creating new message:', message);
    const remitente_id = message.remitente_id !== undefined ? message.remitente_id : null;
    const destinatario_id = message.destinatario_id !== undefined ? message.destinatario_id : null;
    const mensaje = message.mensaje !== undefined ? message.mensaje : '';
    const fecha_envio = message.fecha_envio !== undefined ? message.fecha_envio : new Date().toISOString().slice(0, 19).replace('T', ' ');

    await pool.query(
      'INSERT INTO Mensajes (remitente_id, destinatario_id, mensaje, fecha_envio) VALUES (?, ?, ?, ?)',
      [remitente_id, destinatario_id, mensaje, fecha_envio]
    );
  }
}
