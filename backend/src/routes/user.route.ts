import { Router } from "express";
import userController from '../controllers/user.controller';

const router = Router();

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.newUser);

router
    .route('/login')
    .post(userController.loginUser);

export default router;