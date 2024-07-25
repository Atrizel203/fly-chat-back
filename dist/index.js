"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastMessage = broadcastMessage;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./modules/user/infrastructure/routes/user.routes"));
const message_routes_1 = __importDefault(require("./modules/message/infrastructure/routes/message.routes"));
const payment_routes_1 = __importDefault(require("./modules/payment/infrastructure/routes/payment.routes"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws"); // Importa WebSocketServer y WebSocket desde el paquete 'ws'
const mqtt_connection_1 = require("./modules/message/rabbitmq/mqtt-connection");
const usecases_1 = require("./modules/message/application/usecases");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', user_routes_1.default);
app.use('/api/messages', message_routes_1.default);
app.use('/api', payment_routes_1.default);
const PORT = process.env.PORT || 3360;
const wss = new ws_1.WebSocketServer({ server });
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
function broadcastMessage(message) {
    wss.clients.forEach((client) => {
        if (client.readyState === ws_1.WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}
app.delete('/api/messages/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const result = yield usecases_1.deleteMessageUseCase.execute(id);
        if (result) {
            res.status(200).send('Message deleted');
            broadcastMessage({ type: 'delete', id });
        }
        else {
            res.status(404).send('Message not found');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
        else {
            res.status(500).send('An unknown error occurred');
        }
    }
}));
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    (0, mqtt_connection_1.connectToMQTTBroker)();
});
