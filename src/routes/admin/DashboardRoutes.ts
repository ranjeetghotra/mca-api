import * as express from 'express';
const router = express.Router();
import DashboardController from '../../controllers/DashboardController';

/*
 * GET
 */
router.get('/', DashboardController.data);

export = router;
