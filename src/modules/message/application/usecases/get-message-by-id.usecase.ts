import { MessageRepository } from '../../domain/repositories/message.repository';
import { Message } from '../../domain/models/message.model';

export class GetMessageByIdUseCase {
  constructor(private messageRepository: MessageRepository) {}

  async execute(id: number): Promise<Message | null> {
    return this.messageRepository.findById(id);
  }
}
