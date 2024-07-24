import { MessageRepository } from '../../domain/repositories/message.repository';
import { Message } from '../../domain/models/message.model';

export class CreateMessageUseCase {
  constructor(private messageRepository: MessageRepository) {}

  async execute(message: Message): Promise<void> {
    console.log('Executing create message use case:', message);
    if (message.remitente_id === undefined || message.destinatario_id === undefined || !message.mensaje || !message.fecha_envio) {
      throw new Error('Todos los campos son obligatorios');
    }
    await this.messageRepository.create(message);
  }
}
