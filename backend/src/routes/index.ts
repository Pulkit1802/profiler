import { Router } from "express";
import userRouter from './user.route';
import hrRouter from './hr.route';

type routeType = {
    path: string,
    route: Router
}

const routes: routeType[] = [
    {path: '/user', route: userRouter},
    {path: '/hr', route: hrRouter}
];

const router = Router();

routes.forEach(route => {
    router.use(route.path, route.route);
});

export default router;