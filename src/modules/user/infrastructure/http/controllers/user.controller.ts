import { Request, Response } from 'express';
import { createUserUseCase, getUserByIdUseCase, deleteUserByNameUseCase, getUsersByNameUseCase, getAllUsersUseCase, updateUserUseCase, authenticateUserUseCase  } from '../../../application/usecases';
import { User } from '../../../domain/models/user.model';

export class UserController {
  static async getUsers(req: Request, res: Response): Promise<void> {
    const { userId } = req.query; // Obtener el ID del usuario que ha iniciado sesión
    const users = await getAllUsersUseCase.execute();
    const filteredUsers = users.filter(user => user.id !== parseInt(userId as string));
    res.json(filteredUsers);
  } 

  static async getUserById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const user = await getUserByIdUseCase.execute(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  }

  static async getUsersByName(req: Request, res: Response): Promise<void> {
    const name = req.params.name;
    const users = await getUsersByNameUseCase.execute(name);
    res.json(users);
  }

  static async createUser(req: Request, res: Response): Promise<void> {
    const user = req.body as User;
    await createUserUseCase.execute(user);
    res.status(201).send('User created');
  }

  static async deleteUserByName(req: Request, res: Response): Promise<void> {
    const name = req.params.name;
    const result = await deleteUserByNameUseCase.execute(name);
    if (result) {
      res.status(200).send('User deleted');
    } else {
      res.status(404).send('User not found');
    }
  }

  static async authenticateUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const user = await authenticateUserUseCase.execute(email, password);
    if (user) {
      res.json(user);
    } else {
      res.status(401).send('Invalid credentials');
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    const user = req.body as User;
    await updateUserUseCase.execute(user);
    res.status(200).send('User updated');
  }

  }