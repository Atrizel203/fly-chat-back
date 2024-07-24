import { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/models/user.model';
import { pool } from '../../../../../config/database.config';

export class MySQLUserRepository implements UserRepository {

  async findById(id: number): Promise<User | null> {
    const [rows] = await pool.query('SELECT * FROM Usuarios WHERE id = ?', [id]);
    const users = rows as User[];
    return users.length ? users[0] : null;
  }

  async findByName(name: string): Promise<User[]> {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE nombre = ?', [name]);
    return rows as User[];
  }

  async deleteByName(name: string): Promise<void> {
    await pool.query('DELETE FROM Usuarios WHERE nombre = ?', [name]);
  }


  async findAll(): Promise<User[]> {
    const [rows] = await pool.query('SELECT * FROM Usuarios')
    return rows as User[]
  }

  async create(user: User): Promise<void> {
    const formattedDate = new Date(user.fecha_registro).toISOString().slice(0, 19).replace('T', ' ');
    await pool.query('INSERT INTO Usuarios (nombre, email, password, fecha_registro) VALUES (?, ?, ?, ?)', [user.nombre, user.email, user.password, formattedDate]);
  }

  async findByEmail(email: string): Promise<User[]> {
    const [rows] = await pool.query('SELECT * FROM Usuarios WHERE email = ?', [email]);
    return rows as User[];
  }

  async update(user: User): Promise<void> {
    await pool.query('UPDATE Usuarios SET nombre = ?, email = ?, password = ?, fecha_registro = ? WHERE id = ?', [user.nombre, user.email, user.password, user.fecha_registro, user.id]);
  }
}
