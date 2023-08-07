import { Router } from "express";
import jobsController from "../controllers/jobs.controller";
import authenticate from "../middleware/authentication";

const router = Router();

router
    .route('/')
    .post(authenticate, jobsController.newjob);


router
    .route('/all')
    .get(jobsController.getAlljobs);


router
    .route('/:job_id')
    .get(jobsController.getjob);

export default router;