import { MySQLMessageRepository } from '../../infrastructure/adapters/mysql/message.repository.impl';
import { CreateMessageUseCase } from './create-message.usecase';
import { GetMessageByIdUseCase } from './get-message-by-id.usecase';
import { DeleteMessageUseCase } from './delete-message.usecase';
import { GetMessagesByUserIdUseCase } from './get-messages-by-user-id.usecase';

const messageRepository = new MySQLMessageRepository();

export const createMessageUseCase = new CreateMessageUseCase(messageRepository);
export const getMessageByIdUseCase = new GetMessageByIdUseCase(messageRepository);
export const deleteMessageUseCase = new DeleteMessageUseCase(messageRepository);
export const getMessagesByUserIdUseCase = new GetMessagesByUserIdUseCase(messageRepository);

