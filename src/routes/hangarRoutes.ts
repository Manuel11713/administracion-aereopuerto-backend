import {Router} from 'express';
const router = Router();

//-----Controllers
import {getHangar, getHangars, postHangar} from '../controllers/hangarController';

router.get('/hangar/:id', getHangar);
router.get('/hangars', getHangars);

router.post('/hangar', postHangar);

export default router;