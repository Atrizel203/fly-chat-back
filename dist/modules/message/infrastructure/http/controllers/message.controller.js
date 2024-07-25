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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const usecases_1 = require("../../../application/usecases");
const mqtt_connection_1 = require("../../../rabbitmq/mqtt-connection");
const index_1 = require("../../../../../index");
class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
        this.createMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { remitente_id, destinatario_id, mensaje, fecha_envio } = req.body;
            try {
                const newMessage = {
                    remitente_id,
                    destinatario_id,
                    mensaje,
                    fecha_envio: new Date(fecha_envio),
                };
                // Crear el mensaje en la base de datos
                yield this.messageService.createMessage(newMessage);
                // Enviar el mensaje a MQTT
                (0, mqtt_connection_1.sendMessageToMQTT)(remitente_id, destinatario_id, mensaje);
                // Notificar a los clientes conectados a través de WebSocket
                (0, index_1.broadcastMessage)(newMessage);
                return res.status(201).json(newMessage);
            }
            catch (error) {
                console.error('Error creating message:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    static getMessageById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            console.log(`Fetching message with ID: ${id}`);
            const message = yield usecases_1.getMessageByIdUseCase.execute(id);
            if (message) {
                res.json(message);
            }
            else {
                res.status(404).send('Message not found');
            }
        });
    }
    static getMessagesByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId, 10);
            console.log(`Fetching messages for user ID: ${userId}`);
            const messages = yield usecases_1.getMessagesByUserIdUseCase.execute(userId);
            res.json(messages);
        });
    }
    static deleteMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            console.log(`Deleting message with ID: ${id}`);
            const result = yield usecases_1.deleteMessageUseCase.execute(id);
            if (result) {
                res.status(200).send('Message deleted');
                (0, index_1.broadcastMessage)({ type: 'delete', id });
            }
            else {
                res.status(404).send('Message not found');
            }
        });
    }
}
exports.MessageController = MessageController;
