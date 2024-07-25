import express from 'express';
import cors from 'cors';
import userRoutes from './modules/user/infrastructure/routes/user.routes';
import messageRoutes from './modules/message/infrastructure/routes/message.routes';
import paymentRoutes from './modules/payment/infrastructure/routes/payment.routes';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws'; // Importa WebSocketServer y WebSocket desde el paquete 'ws'
import { connectToMQTTBroker } from './modules/message/rabbitmq/mqtt-connection';
import { Message } from './modules/message/domain/models/message.model';
import { deleteMessageUseCase } from './modules/message/application/usecases';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api', paymentRoutes);

const PORT = 80;

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (message) => {
    console.log('Message received:', message.toString());
    ws.send(`Server received: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

interface DeleteMessageNotification {
  type: 'delete';
  id: number;
}

function broadcastMessage(message: Message | DeleteMessageNotification) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

app.delete('/api/messages/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const result = await deleteMessageUseCase.execute(id);
    if (result) {
      res.status(200).send('Message deleted');
      broadcastMessage({ type: 'delete', id });
    } else {
      res.status(404).send('Message not found');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred');
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToMQTTBroker();
});

export { broadcastMessage };
