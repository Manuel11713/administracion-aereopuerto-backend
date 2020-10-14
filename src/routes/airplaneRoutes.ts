import {Router} from 'express';

const router = Router();

//-----Controllers
import {createAirplane, deleteAirplane, getAirplane, getAirplanes} from '../controllers/airplaneController';
router.get('/airplane/:id', getAirplane);
router.get('/airplanes', getAirplanes);

router.post('/airplane', createAirplane);

router.delete('/airplane/:id',deleteAirplane);

export default router;