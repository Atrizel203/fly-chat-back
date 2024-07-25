import { Request, Response } from 'express';
import { createMessageUseCase, getMessageByIdUseCase, getMessagesByUserIdUseCase, deleteMessageUseCase } from '../../../application/usecases';
import { sendMessageToMQTT } from '../../../rabbitmq/mqtt-connection';
import { MessageService } from '../../../application/services/message.service';
import { broadcastMessage } from '../../../../../index';

export class MessageController {
  constructor(private messageService: MessageService) {}

  public createMessage = async (req: Request, res: Response): Promise<Response> => {
    const { remitente_id, destinatario_id, mensaje, fecha_envio } = req.body;

    try {
      const newMessage = {
        remitente_id,
        destinatario_id,
        mensaje,
        fecha_envio: new Date(fecha_envio),
      };

      // Crear el mensaje en la base de datos
      await this.messageService.createMessage(newMessage);

      // Enviar el mensaje a MQTT
      sendMessageToMQTT(remitente_id, destinatario_id, mensaje);


       // Notificar a los clientes conectados a través de WebSocket
       broadcastMessage(newMessage);

      return res.status(201).json(newMessage);
    } catch (error) {
      console.error('Error creating message:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  public static async getMessageById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    console.log(`Fetching message with ID: ${id}`);
    const message = await getMessageByIdUseCase.execute(id);
    if (message) {
      res.json(message);
    } else {
      res.status(404).send('Message not found');
    }
  }

  public static async getMessagesByUserId(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.userId, 10);
    console.log(`Fetching messages for user ID: ${userId}`);
    const messages = await getMessagesByUserIdUseCase.execute(userId);
    res.json(messages);
  }

  public static async deleteMessage(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    console.log(`Deleting message with ID: ${id}`);
    const result = await deleteMessageUseCase.execute(id);
    if (result) {
      res.status(200).send('Message deleted');
      broadcastMessage({ type: 'delete', id });
    } else {
      res.status(404).send('Message not found');
    }
  }
}
