import * as express from 'express';
const router = express.Router();
import ProductController from '../../controllers/ProductController';

/*
 * GET
 */
router.get('/', ProductController.list);

/*
 * GET
 */
router.get('/:id', ProductController.show);

export = router;
