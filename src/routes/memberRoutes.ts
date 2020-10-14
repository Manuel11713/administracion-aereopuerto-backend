import {Router} from 'express';

const router = Router();

//-----Controllers
import {getMember, getMembers, postMember} from '../controllers/memberController';

router.get('/member/:id', getMember);
router.get('/members', getMembers);

router.post('/member', postMember);

export default router;