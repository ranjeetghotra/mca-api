import * as express from 'express';
const router = express.Router();
import UserController from '../controllers/UserController';

router.post('/login', UserController.login);
router.post('/register', UserController.register);

export = router;
