import applicationController from "../controllers/application.controller";
import { Router } from "express";
import authenticate from "../middleware/authentication";

const router = Router();

router
    .route('/')
    .post(authenticate, applicationController.newapplication);

router
    .route('/all')
    .get(authenticate, applicationController.getAllapplications);

router
    .route('/:application_id')
    .get(authenticate, applicationController.getapplication);

export default router;