import { Router } from 'express';
import userController from '../controllers/userController.js';

const router = Router();

router.get('/', userController.findByID);
router.get('/all', userController.getAll);
router.post('/add', userController.createUser);
router.put('/update', userController.updateUser);

export default router;
