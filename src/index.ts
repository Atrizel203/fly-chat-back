import express from 'express';
import "dotenv/config";
import cors from 'cors';
import userRoutes from './modules/user/infrastructure/routes/user.routes';
import messageRoutes from './modules/message/infrastructure/routes/message.routes';
import paymentRoutes from './modules/payment/infrastructure/routes/payment.routes';
import http from 'http';
import { WebSocketServer } from 'ws';
import { createMessageUseCase } from './modules/message/application/usecases';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api', paymentRoutes);

const PORT = process.env.PORT || 3000;

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('message', async (message: Buffer) => {
    try {
      const messageString = message.toString('utf-8');
      const parsedMessage = JSON.parse(messageString);

      // Guarda el mensaje en la base de datos
      await createMessageUseCase.execute(parsedMessage);

      // Broadcast the message to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(JSON.stringify(parsedMessage));
        }
      });
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });

  ws.send('WebSocket connection established');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
