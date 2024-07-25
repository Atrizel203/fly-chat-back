import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/models/user.model';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async authenticateUser(email: string) : Promise<User[] | null>{
    return this.userRepository.findByEmail(email);
  }

  async getUsersByName(name: string): Promise<User[]> {
    return this.userRepository.findByName(name);
  }

  async deleteUserByName(name: string): Promise<boolean> {
    const users = await this.userRepository.findByName(name);
    if (users.length > 0) {
      await this.userRepository.deleteByName(name);
      return true;
    }
    return false;
  }

  async createUser(user: User): Promise<void> {
    return this.userRepository.create(user);
  }
}
