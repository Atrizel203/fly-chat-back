import { MessageRepository } from '../../domain/repositories/message.repository';
import { Message } from '../../domain/models/message.model';

export class MessageService {
  constructor(private messageRepository: MessageRepository) {}

  async getAllMessages(): Promise<Message[]> {
    return this.messageRepository.findAll();
  }

  async getMessageById(id: number): Promise<Message | null> {
    return this.messageRepository.findById(id);
  }

  async getMessagesByUserId(message: number): Promise<Message[]>{
    return this.messageRepository.findByUserId(message);
  }

  async deleteMessage(id: number): Promise<boolean> {
    const message = await this.messageRepository.findById(id);
    if (message) {
      await this.messageRepository.delete(id);
      return true;
    }
    return false;
  }

  async createMessage(message: Message): Promise<void> {
    return this.messageRepository.create(message);
  }
}