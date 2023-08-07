import { Router } from "express";
import hrController from "../controllers/hr.controller";
import authenticate from "../middleware/authentication";

const router = Router();

router
    .route('/')
    .get(authenticate, hrController.gethr)
    .post(hrController.newhr);


router
    .route('/all')
    .get(authenticate, hrController.getAllhrs);


router
    .route('/login')
    .post(hrController.loginhr);

export default router;