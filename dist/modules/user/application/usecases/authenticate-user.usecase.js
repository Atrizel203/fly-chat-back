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
exports.AuthenticateUserUseCase = void 0;
class AuthenticateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.findByEmail(email);
            if (users.length > 0 && users[0].password === password) {
                return users[0];
            }
            return null;
        });
    }
}
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;
