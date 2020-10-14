import {Router} from 'express';
import express from 'express';
const router = express.Router();

//Controllers
import { createLobby, getLobby, getLobbies} from '../controllers/lobbyController';

router.get('/lobby/:id',getLobby);
router.get('/lobbies',getLobbies);

router.post('/lobby', createLobby);



export default router;