import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/models/user.model';

export class GetUsersByNameUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(name: string): Promise<User[]> {
    return await this.userRepository.findByName(name);
  }
}