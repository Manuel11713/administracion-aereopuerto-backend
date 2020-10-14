import {Router} from 'express';

const router = Router();

//-----Controllers
import {createFlight,getFlight, getFlights} from '../controllers/fligthController';

router.get('/flight/:id', getFlight);
router.get('/flights', getFlights);

router.post('/flight', createFlight);

export default router;