import {Router} from 'express';

//-----Controllers
import {createPilot, deletePilot, getPilot, getPilots, updatePilot} from '../controllers/pilotoController';

const router = Router();

router.get('/pilot/:id', getPilot);
router.get('/pilots', getPilots);

router.post('/pilot', createPilot);

router.put('/pilot/:id', updatePilot);

router.delete('/pilot/:id', deletePilot);

export default router;