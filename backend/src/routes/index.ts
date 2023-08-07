import { Router } from "express";
import userRouter from './user.route';
import hrRouter from './hr.route';
import jobRouter from './job.route';
import applicationRouter from './application.route';

type routeType = {
    path: string,
    route: Router
}

const routes: routeType[] = [
    {path: '/user', route: userRouter},
    {path: '/hr', route: hrRouter},
    {path: '/job', route: jobRouter},
    {path: '/application', route: applicationRouter}
];

const router = Router();

routes.forEach(route => {
    router.use(route.path, route.route);
});

export default router;