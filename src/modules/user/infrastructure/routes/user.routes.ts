import { Router } from 'express';
import { UserController } from '../http/controllers/user.controller';

const router = Router();

router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getUserById);
router.get('/users/name/:name', UserController.getUsersByName)
router.post('/users', UserController.createUser);
router.post('/users/login', UserController.authenticateUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/name/:name', UserController.deleteUserByName);

export default router;
