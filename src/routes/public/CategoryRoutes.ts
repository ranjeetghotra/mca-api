import * as express from 'express';
const router = express.Router();
import CategoryController from '../../controllers/CategoryController';

/*
 * GET
 */
router.get('/', CategoryController.list);

/*
 * GET
 */
router.get('/:id', CategoryController.show);

export = router;
