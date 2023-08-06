import { Router } from "express";

type routeType = {
    path: string,
    route: Router
}

const routes: routeType[] = [
];

const router = Router();

routes.forEach(route => {
    router.use(route.path, route.route);
});

export default router;