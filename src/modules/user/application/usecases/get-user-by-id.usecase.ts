import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/models/user.model';

export class GetUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
