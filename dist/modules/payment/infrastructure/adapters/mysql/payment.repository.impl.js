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
exports.PaymentRepository = void 0;
const database_config_1 = require("../../../../../config/database.config");
class PaymentRepository {
    static create(payment) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO Pagos (usuario_id, monto, metodo_pago) VALUES (?, ?, ?)';
            const values = [payment.usuario_id, payment.monto, payment.metodo_pago];
            yield database_config_1.pool.query(query, values);
        });
    }
}
exports.PaymentRepository = PaymentRepository;
