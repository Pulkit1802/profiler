import { Router } from "express";
import userRouter from './user.route';

type routeType = {
    path: string,
    route: Router
}

const routes: routeType[] = [
    {path: '/user', route: userRouter}
];

const router = Router();

routes.forEach(route => {
    router.use(route.path, route.route);
});

export default router;