import { Request, Response } from 'express';
import { createMessageUseCase, getMessageByIdUseCase, getMessagesByUserIdUseCase, deleteMessageUseCase} from '../../../application/usecases';
import { MySQLMessageRepository } from '../../adapters/mysql/message.repository.impl';

export class MessageController {



  static async getMessageById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    console.log(`Fetching message with ID: ${id}`);
    const message = await getMessageByIdUseCase.execute(id);
    if (message) {
      res.json(message);
    } else {
      res.status(404).send('Message not found');
    }
  }


  static async getMessagesByUserId(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.userId, 10);
    console.log(`Fetching messages for user ID: ${userId}`);
    const messages = await getMessagesByUserIdUseCase.execute(userId);
    res.json(messages);
  }

  static async createMessage(req: Request, res: Response): Promise<void> {
    const message = req.body;
    console.log('Creating message:', message);
    await createMessageUseCase.execute(message);
    res.status(201).send('Message created');
  }

  static async deleteMessage(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    console.log(`Deleting message with ID: ${id}`);
    const result = await deleteMessageUseCase.execute(id);
    if (result) {
      res.status(200).send('Message deleted');
    } else {
      res.status(404).send('Message not found');
    }
  }
}
