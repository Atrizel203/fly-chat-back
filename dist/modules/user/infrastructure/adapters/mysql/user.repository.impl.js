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
exports.MySQLUserRepository = void 0;
const database_config_1 = require("../../../../../config/database.config");
class MySQLUserRepository {
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield database_config_1.pool.query('SELECT * FROM Usuarios WHERE id = ?', [id]);
            const users = rows;
            return users.length ? users[0] : null;
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield database_config_1.pool.query('SELECT * FROM usuarios WHERE nombre = ?', [name]);
            return rows;
        });
    }
    deleteByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_config_1.pool.query('DELETE FROM Usuarios WHERE nombre = ?', [name]);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield database_config_1.pool.query('SELECT * FROM Usuarios');
            return rows;
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const formattedDate = new Date(user.fecha_registro).toISOString().slice(0, 19).replace('T', ' ');
            yield database_config_1.pool.query('INSERT INTO Usuarios (nombre, email, password, fecha_registro) VALUES (?, ?, ?, ?)', [user.nombre, user.email, user.password, formattedDate]);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield database_config_1.pool.query('SELECT * FROM Usuarios WHERE email = ?', [email]);
            return rows;
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_config_1.pool.query('UPDATE Usuarios SET nombre = ?, email = ?, password = ?, fecha_registro = ? WHERE id = ?', [user.nombre, user.email, user.password, user.fecha_registro, user.id]);
        });
    }
}
exports.MySQLUserRepository = MySQLUserRepository;
