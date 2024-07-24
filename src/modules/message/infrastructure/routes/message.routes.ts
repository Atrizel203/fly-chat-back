import { Router } from 'express';
import { MessageController } from '../http/controllers/message.controller';

const router = Router();


router.get('/user/:userId', MessageController.getMessagesByUserId);


router.get('/:id', MessageController.getMessageById);
router.post('/', MessageController.createMessage);
router.delete('/:id', MessageController.deleteMessage);

export default router;
