import { Router } from 'express';
import userController from '../controllers/userController.js';

const router = Router();

router.get('/', userController.findByID);
router.post('/add', userController.createUser);

export default router;
