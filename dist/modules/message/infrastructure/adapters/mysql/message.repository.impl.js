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
exports.MySQLMessageRepository = void 0;
const database_config_1 = require("../../../../../config/database.config");
class MySQLMessageRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Fetching all messages');
            const [rows] = yield database_config_1.pool.query('SELECT * FROM Mensajes');
            return rows;
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Fetching messages for userId: ${userId}`);
            const [rows] = yield database_config_1.pool.query('SELECT * FROM Mensajes WHERE remitente_id = ? OR destinatario_id = ?', [userId, userId]);
            return rows;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Fetching message by id: ${id}`);
            const [rows] = yield database_config_1.pool.query('SELECT * FROM Mensajes WHERE id = ?', [id]);
            if (rows.length === 0) {
                return null;
            }
            return rows[0];
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Deleting message by id: ${id}`);
            yield database_config_1.pool.query('DELETE FROM Mensajes WHERE id = ?', [id]);
        });
    }
    create(message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Creating new message:', message);
            const remitente_id = message.remitente_id !== undefined ? message.remitente_id : null;
            const destinatario_id = message.destinatario_id !== undefined ? message.destinatario_id : null;
            const mensaje = message.mensaje !== undefined ? message.mensaje : '';
            const fecha_envio = message.fecha_envio !== undefined ? message.fecha_envio : new Date().toISOString().slice(0, 19).replace('T', ' ');
            yield database_config_1.pool.query('INSERT INTO Mensajes (remitente_id, destinatario_id, mensaje, fecha_envio) VALUES (?, ?, ?, ?)', [remitente_id, destinatario_id, mensaje, fecha_envio]);
        });
    }
}
exports.MySQLMessageRepository = MySQLMessageRepository;
