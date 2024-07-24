import { MessageRepository } from '../../domain/repositories/message.repository';

export class DeleteMessageUseCase {
  constructor(private messageRepository: MessageRepository) {}

  async execute(id: number): Promise<boolean> {
    const message = await this.messageRepository.findById(id);
    if (message) {
      await this.messageRepository.delete(id);
      return true;
    }
    return false;
  }
}
