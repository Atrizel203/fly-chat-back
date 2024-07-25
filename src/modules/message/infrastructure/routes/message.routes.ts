import { Router } from 'express';
import { MessageController } from '../http/controllers/message.controller';
import { MessageService } from '../../application/services/message.service';
import { MySQLMessageRepository } from '../adapters/mysql/message.repository.impl';

const messageRouter = Router();
const messageRepository = new MySQLMessageRepository();
const messageService = new MessageService(messageRepository);
const messageController = new MessageController(messageService);

// Crear un mensaje
messageRouter.post('/', messageController.createMessage);

// Obtener un mensaje por ID
messageRouter.get('/:id', MessageController.getMessageById);

// Obtener mensajes por ID de usuario
messageRouter.get('/user/:userId', MessageController.getMessagesByUserId);

// Eliminar un mensaje por ID
messageRouter.delete('/:id', MessageController.deleteMessage);

export default messageRouter;
