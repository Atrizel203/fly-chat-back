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
exports.UserController = void 0;
const usecases_1 = require("../../../application/usecases");
class UserController {
    static getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.query; // Obtener el ID del usuario que ha iniciado sesión
            const users = yield usecases_1.getAllUsersUseCase.execute();
            const filteredUsers = users.filter(user => user.id !== parseInt(userId));
            res.json(filteredUsers);
        });
    }
    static getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            const user = yield usecases_1.getUserByIdUseCase.execute(id);
            if (user) {
                res.json(user);
            }
            else {
                res.status(404).send('User not found');
            }
        });
    }
    static getUsersByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = req.params.name;
            const users = yield usecases_1.getUsersByNameUseCase.execute(name);
            res.json(users);
        });
    }
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            yield usecases_1.createUserUseCase.execute(user);
            res.status(201).send('User created');
        });
    }
    static deleteUserByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = req.params.name;
            const result = yield usecases_1.deleteUserByNameUseCase.execute(name);
            if (result) {
                res.status(200).send('User deleted');
            }
            else {
                res.status(404).send('User not found');
            }
        });
    }
    static authenticateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield usecases_1.authenticateUserUseCase.execute(email, password);
            if (user) {
                res.json(user);
            }
            else {
                res.status(401).send('Invalid credentials');
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            yield usecases_1.updateUserUseCase.execute(user);
            res.status(200).send('User updated');
        });
    }
}
exports.UserController = UserController;
