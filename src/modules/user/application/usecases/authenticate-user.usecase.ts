import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/models/user.model';

export class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<User | null> {
    const users = await this.userRepository.findByEmail(email);
    if (users.length > 0 && users[0].password === password) {
      return users[0];
    }
    return null;
  }
}