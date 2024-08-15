import { Router } from 'express';
import { userController } from '../controller/userController.js';
import { blogController } from '../controller/blogController.js';


export const router = Router();
router.use('/user', userController);
router.use('/blog', blogController);

