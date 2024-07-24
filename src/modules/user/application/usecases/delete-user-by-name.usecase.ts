import { UserRepository } from '../../domain/repositories/user.repository';

export class DeleteUserByNameUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(name: string): Promise<boolean> {
    const users = await this.userRepository.findByName(name);
    if (users.length > 0) {
      await this.userRepository.deleteByName(name);
      return true;
    }
    return false;
  }
}
