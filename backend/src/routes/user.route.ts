import { Router } from "express";
import userController from 'controllers/user.controller';

const router = Router();

router.post('/newUser', userController.newUser);

export default router;