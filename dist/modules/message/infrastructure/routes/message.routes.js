"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = require("../http/controllers/message.controller");
const message_service_1 = require("../../application/services/message.service");
const message_repository_impl_1 = require("../adapters/mysql/message.repository.impl");
const messageRouter = (0, express_1.Router)();
const messageRepository = new message_repository_impl_1.MySQLMessageRepository();
const messageService = new message_service_1.MessageService(messageRepository);
const messageController = new message_controller_1.MessageController(messageService);
// Crear un mensaje
messageRouter.post('/', messageController.createMessage);
// Obtener un mensaje por ID
messageRouter.get('/:id', message_controller_1.MessageController.getMessageById);
// Obtener mensajes por ID de usuario
messageRouter.get('/user/:userId', message_controller_1.MessageController.getMessagesByUserId);
// Eliminar un mensaje por ID
messageRouter.delete('/:id', message_controller_1.MessageController.deleteMessage);
exports.default = messageRouter;
