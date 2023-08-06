import { Router } from "express";
import userController from '../controllers/user.controller';
import authenticate from "../middleware/authentication";

const router = Router();

router
    .route('/')
    .get(authenticate, userController.getUser)
    .post(userController.newUser);


router
    .route('/all')
    .get(authenticate, userController.getAllUsers);


router
    .route('/login')
    .post(userController.loginUser);

export default router;