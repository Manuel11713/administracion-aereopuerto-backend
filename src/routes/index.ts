import {Router} from 'express';

//Routes
import pilotRoutes from './pilotRoutes';
import airplaneRoutes from './airplaneRoutes';
import lobbyRoutes from './lobbyRoutes';
import hangarRoutes from './hangarRoutes';
import memberRoutes from './memberRoutes';
import flightRoutes from './fligthRoutes';

const router =  Router();

router.use(pilotRoutes);
router.use(airplaneRoutes);
router.use(lobbyRoutes);
router.use(hangarRoutes);
router.use(memberRoutes);
router.use(flightRoutes);

export default router;