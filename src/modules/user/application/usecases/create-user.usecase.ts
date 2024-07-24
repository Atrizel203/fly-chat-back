  import { UserRepository } from '../../domain/repositories/user.repository';
  import { User } from '../../domain/models/user.model';

  export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(user: User): Promise<void> {
      await this.userRepository.create(user);
    }
  }
