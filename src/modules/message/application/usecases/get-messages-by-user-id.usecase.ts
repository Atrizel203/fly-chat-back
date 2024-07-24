import { MessageRepository } from '../../domain/repositories/message.repository';
import { Message } from '../../domain/models/message.model';

export class GetMessagesByUserIdUseCase {
  constructor(private messageRepository: MessageRepository) {}

  async execute(userId: number): Promise<Message[]> {
    return await this.messageRepository.findByUserId(userId);
  }
}
